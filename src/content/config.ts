import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default('Anonymous'),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
    }),
});

const storiesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
    }),
});

export const collections = {
    blog: blogCollection,
    stories: storiesCollection,
};
