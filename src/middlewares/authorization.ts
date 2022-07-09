import { Request, Response, NextFunction } from 'express';
import { Users } from '../models/users';
import { verify, VerifyOptions } from 'jsonwebtoken';
import { Auth } from '../interfaces/auth.interface';
import { PUBLIC_KEY } from '../constants/auth.constant';

export interface AuthRequest extends Request {
  auth?: Auth;
}

const AuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authorization = req.headers['authorization'];

  if (!authorization || authorization === undefined)
    return res.status(401).json({ message: 'Error', error: 'Unauthorized' });
  try {
    const token = authorization!.split(' ')[1];
    const verifyOptions: VerifyOptions = {
      issuer: 'Aksesaja',
      subject: 'aksesaja.official@gmail.com',
      audience: 'https://aksesaja.site',
      maxAge: '15m',
      algorithms: ['RS256'],
    };

    const auth = verify(token, PUBLIC_KEY, verifyOptions) as Auth;
    const checkUsers = await Users.createQueryBuilder('users')
      .select('users.userId')
      .where('users.userId = :userId', { userId: auth.userId })
      .getOne();

    if (!checkUsers) return res.status(401).json({ message: 'Error', error: 'Unauthorized' });
    req.auth = auth;
    return next();
  } catch (err) {
    const message =
      err.name === 'JsonWebTokenError'
        ? 'Unauthorized'
        : err.name === 'TokenExpiredError'
        ? 'Token Is Expired'
        : err.message;
    console.log('AuthMiddleware', message);
    return res.status(401).json({ message: 'Error', error: 'Unauthorized' });
  }
};

export default AuthMiddleware;
