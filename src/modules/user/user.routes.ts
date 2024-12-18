import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { login, register } from './user.controller';
import { loginSchema, registerUserSchema } from './user.validation';

const router = Router();

// Route for user register
router.post('/register', validateRequest(registerUserSchema), register);

// Route for user login
router.post('/login', validateRequest(loginSchema), login);

export const userRoutes = router;