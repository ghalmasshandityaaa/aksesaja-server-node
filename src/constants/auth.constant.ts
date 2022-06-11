import { CookieOptions } from 'express';
import { Config } from '../helpers/config.helper';
const APP_MODE = Config.get('APP_MODE');

export const SECURE_COOKIES = APP_MODE !== 'localhost';
export const SAME_SITE_COOKIES = SECURE_COOKIES ? 'strict' : 'lax';
export const COOKIES_OPTIONS: CookieOptions = { httpOnly: true, secure: SECURE_COOKIES, sameSite: SAME_SITE_COOKIES };
