import { CorsOptions } from "cors";

export const CORS_OPTION: CorsOptions = {
  credentials: true,
  preflightContinue: true,
  origin: ['http://localhost:3000', 'https://aksesaja-webapp-dev.vercel.app'],
}