import express, { Request, Response } from 'express';
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';
import feedbackRouter from './feedback';
import bannerRouter from './banner';
import organizerRouter from './organizer';

/* Route Release. */
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/feedback', feedbackRouter);
router.use('/banner', bannerRouter);
router.use('/organizer', organizerRouter);

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Success',
    data: {
      api: 'aksesaja.site',
      status: 'Api is running',
    },
  });
});

export default router;
