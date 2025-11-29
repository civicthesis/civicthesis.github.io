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

const educationCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        image: z.string().optional(),
        institution: z.string().optional(),
        courseType: z.string().optional(),
        tags: z.array(z.string()).default([]),
        // New fields for structured content
        type: z.enum(['course', 'subject', 'module', 'unit']).optional().default('course'),
        order: z.number().optional(),
        parent: z.string().optional(),
        subject: z.string().optional(),
    }),
});

export const collections = {
    blog: blogCollection,
    stories: storiesCollection,
    education: educationCollection,
};
