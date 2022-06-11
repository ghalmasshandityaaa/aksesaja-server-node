import type { CorsOptions } from 'cors';
import type { CookieOptions } from 'express';
import { CORS_ORIGIN, SAME_SITE_COOKIES, SECURE_COOKIES } from './../constants/auth.constant';

type ServerConfigType = {
  cors: CorsOptions;
  cookieOptions: CookieOptions;
};
const serverConfig: ServerConfigType = {
  cors: {
    credentials: true,
    origin: CORS_ORIGIN,
  },
  cookieOptions: {
    httpOnly: true,
    secure: SECURE_COOKIES,
    sameSite: SAME_SITE_COOKIES,
  },
};

export default serverConfig;
