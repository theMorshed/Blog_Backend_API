import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createBlogSchema } from './blog.validation';
import { createBlog } from './blog.controller';

const router = Router();

// Route for create room
router.post('/', auth('user'), validateRequest(createBlogSchema), createBlog);

export const blogRoutes = router;