import express from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import { blogRoutes } from './modules/blog/blog.routes';
import { adminRoutes } from './modules/admin/admin.routes';

const app = express();

app.use(express.json());
app.use(cors());

// Application Routes
app.use('/api/auth', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

// Root route that sends a simple "Hello, World!" message
app.get('/', (req, res) => {
    res.send('Blog Backend API project run successfully');
})

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;