import { Config } from '../helpers/config.helper';
const APP_MODE = Config.get('APP_MODE');

export const SECURE_COOKIES = APP_MODE !== 'development';
