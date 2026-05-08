import sourceCatalog from "./sourceCatalog.json";

export type Category = "Agarbatti" | "Dhoop" | "Pooja Samagri";

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  categories?: Category[];
  subcategory: string;
  fragrance: string;
  description: string;
  price: number;
  oldPrice?: number;
  priceLabel?: string;
  packSize: string;
  gramOptions: string[];
  image: string;
  imageFiles?: string[];
  rating: number;
  reviewsCount: number;
  bestFor: string[];
  fragranceProfile: { top: string; heart: string; base: string };
  usageInstructions: string;
  badge?: "Bestseller" | "Premium" | "New" | "Traditional";
  mood?: string[];
  sourceUrl?: string;
}

type SourceProduct = Omit<Product, "image" | "imageFiles"> & {
  imageFile?: string;
  imageFiles?: string[];
};

const productImages = import.meta.glob("../assets/products/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageFor = (fileName?: string) =>
  fileName ? (productImages[`../assets/products/${fileName}`] ?? "") : "";

export const products: Product[] = (sourceCatalog as SourceProduct[]).map((product) => ({
  ...product,
  image: imageFor(product.imageFile),
  imageFiles: product.imageFiles?.map(imageFor).filter(Boolean),
}));

export const getBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getByCategory = (cat: Category) =>
  products.filter((p) => (p.categories ?? [p.category]).includes(cat));
