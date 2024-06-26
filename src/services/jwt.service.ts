import createError from 'http-errors';
import { Users } from '../models/users';
import { Auth, AuthOrganizer } from '../interfaces/auth.interface';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { PUBLIC_KEY, PRIVATE_KEY } from '../constants/auth.constant';
import { Organizer } from '../models/organizer';

export const signAccessToken = async (params: Auth) => {
  const signOption: SignOptions = {
    issuer: 'Aksesaja',
    subject: 'aksesaja.official@gmail.com',
    audience: 'https://aksesaja.site',
    expiresIn: '15m',
    algorithm: 'RS256',
  };
  return sign({ userId: params.userId, email: params.email }, PRIVATE_KEY, signOption);
};

export const signRefreshToken = async (params: Auth) => {
  const signOption: SignOptions = {
    issuer: 'Aksesaja',
    subject: 'aksesaja.official@gmail.com',
    audience: 'https://aksesaja.site',
    expiresIn: '1y',
    algorithm: 'RS256',
  };
  return sign({ userId: params.userId, email: params.email }, PRIVATE_KEY, signOption);
};

export const verifyRefreshToken = async (token: string) => {
  if (!token || token === undefined) return new createError.Unauthorized('Unauthorized!');
  try {
    const verifyOptions: VerifyOptions = {
      issuer: 'Aksesaja',
      subject: 'aksesaja.official@gmail.com',
      audience: 'https://aksesaja.site',
      maxAge: '1y',
      algorithms: ['RS256'],
    };

    const auth = verify(token, PUBLIC_KEY, verifyOptions) as Auth;

    const checkUsers = await Users.createQueryBuilder('users')
      .select('users.userId')
      .where('users.userId = :userId', { userId: auth.userId })
      .getOne();

    if (!checkUsers) return new createError.Unauthorized('Unauthorized!');

    return auth;
  } catch (e) {
    console.error({ service: 'JWTService.verifyRefreshToken', message: e.message });
    throw e;
  }
};

export const signAccessTokenOrganizer = async (params: AuthOrganizer) => {
  const signOption: SignOptions = {
    issuer: 'Aksesaja',
    subject: 'aksesaja.official@gmail.com',
    audience: 'https://aksesaja.site',
    expiresIn: '15m',
    algorithm: 'RS256',
  };
  return sign({ userId: params.userId, organizerId: params.organizerId }, PRIVATE_KEY, signOption);
};

export const signRefreshTokenOrganizer = async (params: AuthOrganizer) => {
  const signOption: SignOptions = {
    issuer: 'Aksesaja',
    subject: 'aksesaja.official@gmail.com',
    audience: 'https://aksesaja.site',
    expiresIn: '1y',
    algorithm: 'RS256',
  };
  return sign({ userId: params.userId, organizerId: params.organizerId }, PRIVATE_KEY, signOption);
};

export const verifyRefreshTokenOrganizer = async (token: string) => {
  if (!token || token === undefined) return new createError.Unauthorized('Unauthorized!');
  try {
    const verifyOptions: VerifyOptions = {
      issuer: 'Aksesaja',
      subject: 'aksesaja.official@gmail.com',
      audience: 'https://aksesaja.site',
      maxAge: '1y',
      algorithms: ['RS256'],
    };

    const auth = verify(token, PUBLIC_KEY, verifyOptions) as AuthOrganizer;

    const checkUsers = await Organizer.findOne({ where: { userId: auth.userId, organizerId: auth.organizerId } });

    if (!checkUsers) return new createError.Unauthorized('Unauthorized!');

    return { auth, err: null, };
  } catch (e) {
    return { auth: null, err: e.message };
  }
};
