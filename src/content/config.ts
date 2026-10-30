import { defineCollection, z } from "astro:content";

const authors = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    name: z.string().optional(),
    title: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional()
  })
});

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    author: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    category: z.string().optional(),
    order: z.number().optional()
  })
});

export const collections = {
  authors,
  posts
};
