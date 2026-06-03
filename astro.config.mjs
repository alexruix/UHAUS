import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";

import config from "./src/config/config.json";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://uhaus.com.ar",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",

  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || "demo",
      dataset: env.PUBLIC_SANITY_DATASET || "production",
      useCdn: false, // Must be false for Visual Editing to fetch drafts
      apiVersion: "2024-05-23",
      stega: {
        studioUrl: env.PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
      },
    }),
    react(),
    sitemap(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Blockquote",
        "@/shortcodes/Badge",
        "@/shortcodes/ContentBlock",
        "@/shortcodes/Changelog",
        "@/shortcodes/Tab",
        "@/shortcodes/Tabs",
      ],
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },
});
