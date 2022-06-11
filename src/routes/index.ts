import express, { Response, Request } from 'express';
import util from 'util';
const exec = util.promisify(require('child_process').exec);
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';
import * as requestIp from 'request-ip';

/* Route Release. */
router.use('/users', userRouter);
router.use('/auth', authRouter);

router.get('/', async (req: Request, res: Response) => {
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
      : req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const IP = publicIp || requestIp.getClientIp(req);
    res.json({ IP });
  } catch (e) {
    res.json(e);
  }
});

export default router;
