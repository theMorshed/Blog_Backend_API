/**
 * Import necessary modules and middleware for routing.
 * - `Router` from `express`: Used to create a new router instance for defining route handlers.
 * - `validateRequest`: Middleware to validate request data against predefined schemas.
 * - `auth`: Middleware for authorization, ensuring that the user has the required role.
 * - `createBlogSchema` and `updateBlogSchema`: Validation schemas for creating and updating blogs.
 * - `createBlog`, `deleteBlog`, `getAllBlogs`, `updateBlog`: Controller functions for handling the respective blog operations.
 */
import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createBlogSchema, updateBlogSchema } from './blog.validation';
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from './blog.controller';

/**
 * The router for handling blog-related routes.
 * 
 * This router defines routes for:
 * - Creating a blog: `POST /` (Requires user authentication with 'user' role).
 * - Fetching all blogs: `GET /`.
 * - Updating a blog: `PATCH /:id` (Requires user authentication with 'user' role).
 * - Deleting a blog: `DELETE /:id` (Requires user authentication with 'user' role).
 */
const router = Router();

/**
 * Route for creating a new blog.
 * 
 * This route allows authenticated users to create a new blog post. The request body is validated using
 * the `createBlogSchema` before passing the data to the `createBlog` controller.
 */
router.post('/', auth('user'), validateRequest(createBlogSchema), createBlog);

/**
 * Route for fetching all blogs.
 * 
 * This route fetches all blogs without any user-specific authentication requirements.
 */
router.get('/', getAllBlogs);

/**
 * Route for updating an existing blog.
 * 
 * This route allows authenticated users to update a blog by providing the blog's ID and the new data.
 * The request body is validated using the `updateBlogSchema` before passing the data to the `updateBlog` controller.
 */
router.patch('/:id', auth('user'), validateRequest(updateBlogSchema), updateBlog);

/**
 * Route for deleting a blog.
 * 
 * This route allows authenticated users to delete a blog by providing the blog's ID.
 */
router.delete('/:id', auth('user'), deleteBlog);

/**
 * Export the blog routes to be used in the main application.
 */
export const blogRoutes = router;