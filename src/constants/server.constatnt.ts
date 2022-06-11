import { CorsOptions } from "cors";

export const CORS_OPTION: CorsOptions = {
  credentials: true,
  preflightContinue: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  origin: ['http://localhost:3000', 'https://aksesaja-webapp-dev.vercel.app', 'https://aksesaja.vercel.app'],
}