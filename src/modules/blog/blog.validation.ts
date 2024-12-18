import { z } from 'zod';

// Define the Zod validation schema for the create blog
export const createBlogSchema = z.object({
    title: z.string().min(1, 'title is required'),
    content: z.string().min(1, 'content is required'),
});

// Define the Zod validation schema for the update blog
export const updateBlogSchema = createBlogSchema.partial();