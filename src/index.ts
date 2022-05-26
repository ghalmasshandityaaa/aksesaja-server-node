/** Import dependencies */
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AppDataSource } from './config/db.config';
import { onError } from './helpers/server.helper';
dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;
const HOST: string = process.env.APP_HOST || '0.0.0.0';
console.log(PORT, HOST)

/** Initialize database */
AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch((error) => console.log(error));

/** Initialize middleware */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** Router Import */
import indexRouter from './routes/index';

/** Routes Release */
app.use('/', indexRouter);

/** 404 Error Handling */
app.use(function (_, res, next) {
  res.status(404).json({
    status: 404,
    message: 'Not Found',
  });
  next();
});

/** Server listen */
app.listen(PORT, HOST, () => {
  console.log(`Server is listening on port: ${PORT}, on http://localhost:${PORT}`);
});
app.on('error', onError);

export default app;
