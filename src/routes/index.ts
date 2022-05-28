import express, { Response } from 'express';
const router = express.Router();

/* Import routes. */
import userRouter from './user';

/* Route Release. */
router.use('/users', userRouter);

router.get('/liveness', (_, res: Response) => {
  res.status(200).json({
    message: 'Success',
    data: {
      status: 'OK',
      time: new Date(),
    },
  });
});

router.get('/', (_, res: Response) => {
  res.status(200).json({
    message: 'Success',
    data: {
      nama: 'Ghalmas Shanditya Putra Agung',
      address: 'Tangerang Selatan, Banten, Indonesia',
    },
  });
});

export default router;
