import { CookieOptions } from 'express';

export const SECURE_COOKIES = process.env.NODE_ENV === 'production';
export const SAME_SITE_COOKIES = SECURE_COOKIES ? 'none' : 'lax';
export const COOKIES_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: SECURE_COOKIES,
  sameSite: SAME_SITE_COOKIES,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  domain: 'heroku.com',
};
