import type { CorsOptions } from 'cors';
import type { CookieOptions } from 'express';
import { SAME_SITE_COOKIES, SECURE_COOKIES } from './../constants/auth.constant';

type ServerConfigType = {
  cors: CorsOptions;
  cookieOptions: CookieOptions;
};

const serverConfig: ServerConfigType = {
  cors: {
    credentials: true,
    origin: ['https://aksesaja-webapp-dev.vercel.app', 'http://localhost:3000'],
  },
  cookieOptions: {
    httpOnly: true,
    secure: SECURE_COOKIES,
    sameSite: SAME_SITE_COOKIES,
  },
};

export default serverConfig;
