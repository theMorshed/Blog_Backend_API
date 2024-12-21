/**
 * Import necessary modules and utilities.
 * - `Router` from `express`: Used to define and handle routing for the admin routes.
 * - `auth`: Middleware for handling authorization and ensuring that only users with the required roles can access the routes.
 * - `blockUser`, `deleteBlog`: Controller functions that handle blocking a user and deleting a blog, respectively.
 */
import { Router } from 'express';
import auth from '../../middlewares/auth';
import { blockUser, deleteBlog } from './admin.controller';

const router = Router();

/**
 * Route to block a user by their user ID.
 * 
 * This route listens for PATCH requests to `/users/:userId/block`. It first ensures that the user has 'admin' privileges
 * via the `auth` middleware. If authorized, the `blockUser` controller is called to block the user.
 * 
 * @route PATCH /users/:userId/block
 * @param req - The Express request object containing the user ID in the parameters.
 * @param res - The Express response object used to send the response.
 * @returns A JSON response indicating whether the user was successfully blocked.
 */
router.patch('/users/:userId/block', auth('admin'), blockUser);

/**
 * Route to delete a blog by its ID.
 * 
 * This route listens for DELETE requests to `/blogs/:id`. It first ensures that the user has 'admin' privileges
 * via the `auth` middleware. If authorized, the `deleteBlog` controller is called to delete the blog.
 * 
 * @route DELETE /blogs/:id
 * @param req - The Express request object containing the blog ID in the parameters.
 * @param res - The Express response object used to send the response.
 * @returns A JSON response indicating whether the blog was successfully deleted.
 */
router.delete('/blogs/:id', auth('admin'), deleteBlog);

export const adminRoutes = router;