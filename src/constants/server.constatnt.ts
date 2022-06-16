import { CorsOptions } from 'cors';

export const CORS_OPTION: CorsOptions = {
  credentials: true,
  origin: ['https://www.aksesaja.site', 'https://aksesaja.site', /\.aksesaja\.site$/],
};
