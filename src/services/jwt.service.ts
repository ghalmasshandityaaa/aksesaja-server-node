import { sign } from 'jsonwebtoken';
import { Response, Request } from 'express';
import { Config } from '../helpers/config.helper';

export const signAccessToken = (params: any) => {
  return sign(params, Config.get('ACCESS_TOKEN_SECRET'), { expiresIn: '1h' });
};

export const signRefreshToken = (params: any) => {
  return sign(params, Config.get('REFRESH_TOKEN_SECRET'), { expiresIn: '365d' });
};

export const verifyAccessToken = (_req: Request, res: Response) => {
  try {
  } catch (e) {
    console.error({ service: 'JWTService.verifyAccessToken', message: e.message, stack: e.stack });
    res.status(400).json({ message: 'Error', error: e.message });
  }
};

export const verifyRefreshToken = (_req: Request, res: Response) => {
  try {
  } catch (e) {
    console.error({ service: 'JWTService.verifyRefreshToken', message: e.message, stack: e.stack });
    res.status(400).json({ message: 'Error', error: e.message });
  }
};
