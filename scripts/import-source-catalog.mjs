import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assetsDir = join(root, "src", "assets", "products");
const catalogPath = join(root, "src", "data", "sourceCatalog.json");

const sourceCategories = [
  { id: 16, slug: "agarbatti", name: "Agarbatti" },
  { id: 29, slug: "dhoop", name: "Dhoop" },
];

const sourceBase = "https://mandarbenareagarbatti.in/wp-json/wc/store/v1/products";
const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

const categoryNames = new Map(sourceCategories.map((category) => [category.slug, category.name]));

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'");
}

function htmlToText(value = "") {
  return decodeEntities(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function slugify(value) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return ascii || "product";
}

function titleCase(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function amountFromMinor(value) {
  return Number(value || 0) / 100;
}

function formatPrice(value) {
  return currency.format(value).replace(/\s/g, "");
}

function buildPriceLabel(product) {
  const range = product.prices?.price_range;
  if (range?.min_amount && range?.max_amount && range.min_amount !== range.max_amount) {
    return `${formatPrice(amountFromMinor(range.min_amount))} - ${formatPrice(amountFromMinor(range.max_amount))}`;
  }
  return formatPrice(amountFromMinor(product.prices?.price));
}

function inferOptions(product) {
  const terms = product.attributes
    ?.flatMap((attribute) => attribute.terms || [])
    .map((term) => term.name)
    .filter(Boolean);

  if (terms?.length) return [...new Set(terms)];

  const fromName = product.name.match(
    /\b\d+\s*(?:g|gm|gram|grams|pcs?|sticks?|cups?|cones?)\b/i,
  )?.[0];
  if (fromName) return [fromName.replace(/\s+/g, "")];

  if (/hamper/i.test(product.name)) return ["1 hamper"];
  return ["1 pack"];
}

function primaryCategory(product) {
  const slugs = new Set(product.categories.map((category) => category.slug));
  return sourceCategories.find((category) => slugs.has(category.slug))?.name ?? "Agarbatti";
}

function productCategories(product) {
  const slugs = new Set(product.categories.map((category) => category.slug));
  return sourceCategories
    .filter((category) => slugs.has(category.slug))
    .map((category) => category.name);
}

function subcategory(product, primary) {
  const direct = product.categories.find((category) => {
    if (categoryNames.has(category.slug)) return false;
    return ["premium", "best-sellers"].includes(category.slug);
  });

  if (direct) return titleCase(direct.name);
  if (/black agarbatti/i.test(product.name)) return "Black Agarbatti";
  if (/cup dhoop/i.test(product.name)) return "Cup Dhoop";
  if (/dhoop candy/i.test(product.name)) return "Dhoop Candy";
  if (/dhoop/i.test(product.name)) return "Dhoop";
  if (/masala/i.test(product.name)) return "Masala Agarbatti";
  return primary;
}

function fragrance(product) {
  const tag = product.tags?.find((item) => !["agarbatti", "dhoop"].includes(item.slug));
  if (tag?.name) return titleCase(tag.name);

  return (
    product.name
      .replace(/\b(premium|masala|black|agarbatti|dhoop|sticks?|cup|candy|jumbo|50gm)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim() || product.name
  );
}

function profileFor(product, category) {
  const source =
    `${product.name} ${fragrance(product)} ${htmlToText(product.description)}`.toLowerCase();
  if (/rose|gulab|गुलाब/.test(source))
    return { top: "Rose", heart: "Soft floral", base: "Devotional sweetness" };
  if (/chandan|sandal|चंदन/.test(source))
    return { top: "Sandalwood", heart: "Creamy wood", base: "Warm temple aroma" };
  if (/mogra|jasmine|मोगरा/.test(source))
    return { top: "Jasmine", heart: "Mogra floral", base: "Mellow sweetness" };
  if (/kewda|केवडा/.test(source))
    return { top: "Kewda", heart: "Fresh floral", base: "Green sweetness" };
  if (/loban|gugul|uud|उद|gugal/.test(source))
    return { top: "Sacred resin", heart: "Deep dhoop smoke", base: "Temple warmth" };
  if (/masala|premium/.test(source))
    return { top: "Rich aromatics", heart: "Traditional masala", base: "Long-lasting warmth" };
  if (category === "Dhoop") return { top: "Resinous", heart: "Herbal smoke", base: "Sacred wood" };
  return { top: "Soft aroma", heart: "Devotional fragrance", base: "Warm incense" };
}

function bestFor(product, category) {
  const source =
    `${product.name} ${fragrance(product)} ${htmlToText(product.description)}`.toLowerCase();
  const uses = new Set(["Daily Puja"]);
  if (category === "Dhoop") uses.add("Aarti");
  if (/premium|hamper|gift|diwali/.test(source)) uses.add("Festive Pooja");
  if (/chandan|sandal|meditation|yoga/.test(source)) uses.add("Meditation");
  if (/loban|gugul|purify|resin/.test(source)) uses.add("Purification");
  if (/rose|mogra|kewda|gulab/.test(source)) uses.add("Home Fragrance");
  return [...uses].slice(0, 4);
}

function mood(product, category) {
  const source = `${product.name} ${fragrance(product)}`.toLowerCase();
  const moods = new Set(["Morning Prayers"]);
  if (category === "Dhoop") moods.add("Temple Essentials");
  if (/premium|hamper|diwali|gift/.test(source)) moods.add("Festive Pooja");
  if (/chandan|meditation|masala/.test(source)) moods.add("Meditation & Yoga");
  if (/rose|mogra|kewda/.test(source)) moods.add("Daily Home Fragrance");
  return [...moods].slice(0, 3);
}

function badge(product) {
  const slugs = new Set(product.categories.map((category) => category.slug));
  if (slugs.has("best-sellers")) return "Bestseller";
  if (slugs.has("premium") || /premium/i.test(product.name)) return "Premium";
  if (new Date(product.date_created_gmt || product.date_created || 0).getFullYear() >= 2026)
    return "New";
  return undefined;
}

function extensionFromUrl(url) {
  const parsed = new URL(url);
  const ext = extname(parsed.pathname).toLowerCase();
  return ext || ".jpg";
}

async function downloadImage(url, destination) {
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  await pipeline(response.body, createWriteStream(destination));
}

async function main() {
  await mkdir(assetsDir, { recursive: true });

  const byId = new Map();
  for (const category of sourceCategories) {
    const url = `${sourceBase}?category=${category.id}&per_page=100`;
    const products = await fetchJson(url);
    for (const product of products) {
      const existing = byId.get(product.id);
      byId.set(product.id, existing ? { ...existing, ...product } : product);
    }
  }

  const products = [...byId.values()].sort((a, b) => {
    const aCategory = primaryCategory(a);
    const bCategory = primaryCategory(b);
    if (aCategory !== bCategory) return aCategory.localeCompare(bCategory);
    return a.name.localeCompare(b.name, "mr");
  });

  const catalog = [];
  const usedFileNames = new Set();

  for (const product of products) {
    const primary = primaryCategory(product);
    const options = inferOptions(product);
    const localImages = [];

    for (const [index, image] of (product.images || []).entries()) {
      const imageUrl = image.thumbnail || image.src;
      const ext = extensionFromUrl(imageUrl);
      const base = slugify(`${product.id}-${product.slug || product.name}-${index + 1}`);
      let fileName = `${base}${ext}`;
      let counter = 2;
      while (usedFileNames.has(fileName)) fileName = `${base}-${counter++}${ext}`;
      usedFileNames.add(fileName);

      await downloadImage(imageUrl, join(assetsDir, fileName));
      localImages.push(fileName);
    }

    const description =
      htmlToText(product.description) ||
      htmlToText(product.short_description) ||
      `${product.name} from Mandar Benare Agarbatti.`;
    const productBadge = badge(product);
    const price = amountFromMinor(product.prices?.price_range?.min_amount || product.prices?.price);
    const regular = amountFromMinor(product.prices?.regular_price);
    const sale = amountFromMinor(product.prices?.sale_price || product.prices?.price);

    catalog.push({
      id: product.id,
      name: product.name,
      slug: decodeURIComponent(product.slug),
      category: primary,
      categories: productCategories(product),
      subcategory: subcategory(product, primary),
      fragrance: fragrance(product),
      description,
      price,
      oldPrice: product.on_sale && regular > sale ? regular : undefined,
      priceLabel: buildPriceLabel(product),
      packSize: options[0],
      gramOptions: options,
      imageFile: localImages[0],
      imageFiles: localImages,
      rating: Number(product.average_rating || 0),
      reviewsCount: Number(product.review_count || 0),
      bestFor: bestFor(product, primary),
      fragranceProfile: profileFor(product, primary),
      usageInstructions:
        primary === "Dhoop"
          ? "Light the tip carefully and place on a heat-proof plate or dhoop holder."
          : "Light the tip, gently blow out the flame, and place in a safe incense holder.",
      badge: productBadge,
      mood: mood(product, primary),
      sourceUrl: product.permalink,
    });
  }

  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Imported ${catalog.length} products`);
  console.log(`Downloaded ${usedFileNames.size} images to ${assetsDir}`);
  console.log(`Wrote ${catalogPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
