import express, { Response, Request } from 'express';
import * as requestIp from 'request-ip';
import { address } from 'ip';
import dns from 'dns';
import util from 'util';
const exec = util.promisify(require('child_process').exec);
const router = express.Router();

/* Import routes. */
import userRouter from './user';
import authRouter from './auth';
import { networkInterfaces } from 'os';
import { ipv4 } from 'ipify2';
import os from 'os';

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
    let hostAddress;
    const iphost2 = dns.lookup(req.get('host')!, { family: 4 }, async (_, address, family) => {
      console.log('address: %j family: IPv%s', address, family);
      hostAddress = address;
      return address;
    });

    let ipHost;
    const ip = dns.lookup(req.get('host')!, async (_, result) => {
      ipHost = result;
      console.log(result)
      return result;
    });

    let value: any;
    const x = async (host: any) => {
      const { stdout } = await exec(`ping -i 1 ${host}`);
      value = stdout.toString();
    }
    // await ping(req.get('host') === 'localhost:5001' ? 'transfer.greatdayhr.com' : req.get('host'));

    const host = req.get('host') === 'localhost:5001' ? 'transfer.greatdayhr.com' : req.get('host');

    await x(host);

    const data = {
      clientIp: req.clientIp,
      ip: req.ip,
      ips: req.ips,
      clientHeaders: req.headers['x-forwarded-for'],
      clientSocket: req.socket.remoteAddress,
      port: req.socket.remotePort,
      localSocket: req.socket.localAddress,
      localport: req.socket.localPort,
      ipLibrary: requestIp.getClientIp(req),
      checkIp: results,
      publicv4: address('public', 'ipv4'),
      publicv6: address('public', 'ipv6'),
      privatev6: address('private', 'ipv6'),
      privatev4: address('private', 'ipv4'),
      ipify3: await ipv4(),
      hostname: os.hostname(),
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl,
      ipHost: ipHost,
      ipHost2: ip,
      hostAddress,
      hostAddress2: iphost2,
    };

    const publicIp = (value!).slice(
      value.indexOf('[') + 1,
      value.lastIndexOf(']'),
    )
    res.json({ data, publicIp })
  } catch (e) {
    res.json(e)
  }
});

export default router;
