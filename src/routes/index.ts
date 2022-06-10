import express, { Response, Request } from 'express';
import * as requestIp from 'request-ip';
import { address } from 'ip';
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';
import { networkInterfaces } from 'os';
import ipify from 'ipify2';

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
  const nets = networkInterfaces();
  const results = Object.create(null);
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  const data = {
    clientIp: req.clientIp,
    ip: req.ip,
    ips: req.ips,
    clientHeaders: req.headers['x-forwarded-for'],
    clientSocket: req.socket.remoteAddress,
    localSocket: req.socket.localAddress,
    ipLibrary: requestIp.getClientIp(req),
    checkIp: results,
    publicv4: address('public', 'ipv4'),
    publicv6: address('public', 'ipv6'),
    privatev6: address('private', 'ipv6'),
    privatev4: address('private', 'ipv4'),
    ipify: ipify.ipv4().then(ipv4 => console.log(ipv4)).catch(err => console.log(err)),
  };

  res.json(data)
});

export default router;
