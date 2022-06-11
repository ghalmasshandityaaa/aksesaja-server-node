import express, { Response, Request } from 'express';
import util from 'util';
const exec = util.promisify(require('child_process').exec);
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';

/* Route Release. */
router.use('/users', userRouter);
router.use('/auth', authRouter);

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

router.get('/myIp', async (req: Request, res: Response) => {
  try {
    let value: any;
    const x = async (host: any) => {
      const { stdout } = await exec(`ping -i 1 ${host}`);
      value = stdout.toString();
    };

    const host = req.get('host') === 'localhost:5001' ? null : req.get('host');

    if (host) await x(host);

    const publicIp = value
      ? value.slice(value.indexOf('[') + 1, value.lastIndexOf(']'))
      : req.headers['x-forwarded-for'];

    res.json({ publicIp });
  } catch (e) {
    res.json(e);
  }
});

export default router;
