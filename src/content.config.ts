import { defineCollection, z } from "astro:content";

// Posts collection in: src/content/posts/*
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(), // YYYY-MM-DD
    author: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false)
  })
});

export const collections = {
  posts
};
