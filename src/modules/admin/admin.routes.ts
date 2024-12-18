import { Router } from 'express';
import auth from '../../middlewares/auth';
import { blockUser, deleteBlog } from './admin.controller';

const router = Router();

// Route for block user
router.patch('/users/:userId/block', auth('admin'), blockUser);

// Router for delete blog
router.delete('/blogs/:id', auth('admin'), deleteBlog);

export const adminRoutes = router;