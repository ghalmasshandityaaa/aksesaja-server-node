import express, { Response } from 'express';
import { Users } from '../models/users';
const router = express.Router();

/* Route Release. */
router.get('/', (_, res: Response) => {
  res.send('API With Express and Node + TS');
});

router.get('/author', (_, res: Response, __) => {
  res.json({
    message: 'Success',
    response: {
      nama: 'Ghalmas Shanditya Putra Agung',
      address: 'Tangerang Selatan, Banten, Indonesia',
      database: process.env.DATABASE_URL,
    },
  });
});

router.get('/test', async (_, res: Response) => {
  const getData = await Users.createQueryBuilder('users').getMany();

  res.json(getData);
});

export default router;
