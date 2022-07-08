import express, { Request, Response } from 'express';
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';

/* Route Release. */
router.use('/users', userRouter);
router.use('/auth', authRouter);

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
