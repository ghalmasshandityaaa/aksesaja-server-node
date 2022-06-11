import { CorsOptions } from "cors";

export const CORS_OPTION: CorsOptions = {
  credentials: true,
  preflightContinue: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  origin: true,
}