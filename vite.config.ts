// @lovable.dev/vite-tanstack-config already includes the following. Do not add
// them manually or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack
//     dedupe, error logger plugins, and sandbox detection.
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// On Vercel, build a static SPA shell because this storefront has no server functions.
export default defineConfig({
  cloudflare: isVercel ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
    ...(isVercel
      ? {
          spa: {
            enabled: true,
            prerender: { outputPath: "/index" },
          },
        }
      : {}),
  },
});
