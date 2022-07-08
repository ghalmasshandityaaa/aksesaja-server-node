import { CookieOptions } from 'express';
import { Config } from '../helpers/config.helper';
import fs from 'fs';

export const SECURE_COOKIES = process.env.NODE_ENV === 'production';
export const SAME_SITE_COOKIES = SECURE_COOKIES ? 'none' : 'lax';
export const COOKIES_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: SECURE_COOKIES,
  sameSite: SAME_SITE_COOKIES,
  maxAge: 1000 * 60 * 60 * 24 * 7,
  domain: Config.get('APP_MODE') === 'localhost' ? 'localhost' : 'aksesaja.site',
};

export const PRIVATE_KEY = fs.readFileSync('./privateKey.pem', 'utf8');
export const PUBLIC_KEY = fs.readFileSync('./publicKey.pem', 'utf8');
