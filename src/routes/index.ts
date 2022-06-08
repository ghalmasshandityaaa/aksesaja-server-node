import express, { Response, Request } from 'express';
import * as requestIp from 'request-ip';
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

router.get('/myIp', (req: Request, res: Response) => {
  const data = {
    clientIp: req.clientIp,
    ipaddr: req.ip,
    head: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    ips: req.connection.remoteAddress,
    ips2: requestIp.getClientIp(req),
  }

  res.send(data)
});

export default router;
