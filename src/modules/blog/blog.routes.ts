import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createBlogSchema, updateBlogSchema } from './blog.validation';
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from './blog.controller';

const router = Router();

// Route for create blog
router.post('/', auth('user'), validateRequest(createBlogSchema), createBlog);

// Route for all blogs
router.get('/', getAllBlogs);

// Route for update blog
router.patch('/:id', auth('user'), validateRequest(updateBlogSchema), updateBlog);

// Route for delete blog
router.delete('/:id', auth('user'), deleteBlog);

export const blogRoutes = router;