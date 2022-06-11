const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const CORS_ORIGIN = IS_PRODUCTION ? 'https://aksesaja-webapp-dev.vercel.app' : 'http://localhost:3000';
export const SECURE_COOKIES = IS_PRODUCTION;
export const SAME_SITE_COOKIES = IS_PRODUCTION ? 'none' : 'lax';
