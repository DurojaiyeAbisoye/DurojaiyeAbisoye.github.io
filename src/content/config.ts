import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    series: z.string().optional(),
    seriesPart: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const books = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    rating: z.number().min(1).max(5).optional(),
    summary: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, books };
