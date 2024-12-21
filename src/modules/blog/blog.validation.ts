// Importing the Zod library for schema validation
import { z } from 'zod';

/**
 * Zod validation schema for creating a blog.
 * 
 * This schema validates the structure of the data required to create a new blog.
 * It ensures that the title and content are non-empty strings.
 * 
 * @property title - The title of the blog, must be a non-empty string.
 * @property content - The content of the blog, must be a non-empty string.
 */
export const createBlogSchema = z.object({
    title: z.string().min(1, 'title is required'), // Ensures title is a non-empty string
    content: z.string().min(1, 'content is required'), // Ensures content is a non-empty string
});

/**
 * Zod validation schema for updating a blog.
 * 
 * This schema is based on the `createBlogSchema` but makes all fields optional, 
 * allowing partial updates to a blog.
 */
export const updateBlogSchema = createBlogSchema.partial(); // Uses partial to make fields optional