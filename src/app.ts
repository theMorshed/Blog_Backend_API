import express from 'express';
import cors from 'cors';
// import { userRoutes } from './modules/user/user.routes';
// import { roomRoutes } from './modules/room/room.routes';
// import { slotRoutes } from './modules/slot/slot.routes';
// import { bookingRoutes } from './modules/booking/booking.routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app = express();

app.use(express.json());
app.use(cors());

// Feature Routes
// app.use('/api/auth', userRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/slots', slotRoutes);
// app.use('/api/bookings', bookingRoutes);

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;