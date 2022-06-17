import express from 'express';
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';

/* Route Release. */
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
