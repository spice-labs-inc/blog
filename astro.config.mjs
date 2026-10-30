// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: {
      excludeLangs: ["mermaid"]
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          strategy: "img-svg"
        }
      ]
    ]
  },
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname
      }
    }
  }
});
