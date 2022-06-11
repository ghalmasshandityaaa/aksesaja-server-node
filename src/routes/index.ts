import express, { Response, Request } from 'express';
import util from 'util';
import { exec } from 'child_process';
const exect = util.promisify(exec);
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
    const ping = async (host: any) => {
      const { stdout } = await exect(`ping -i 1 ${host}`);
      value = stdout.toString();
    };

    console.log(req.get('host'));

    const host = req.get('host') === 'localhost:5001' ? 'aksesaja-dev.herokuapp.com' : req.get('host');

    if (host) await ping(host);

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
