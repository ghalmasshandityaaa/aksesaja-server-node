import { CorsOptions } from "cors";

export const CORS_OPTION: CorsOptions = {
  credentials: true,
  preflightContinue: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Application/json, X-HTTP-Method-Override',
  origin: ['http://localhost:3000', 'https://aksesaja-webapp-dev.vercel.app', 'https://aksesaja.vercel.app'],
}