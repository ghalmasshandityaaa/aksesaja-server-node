/** Import dependencies */
import cookieParser from 'cookie-parser';
import express, { Express } from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Connection } from './config/db.config';
import { onError, error404, clientErrorHandler, logErrors } from './helpers/server.helper';
import initializeCronJob from './cron/auth.cron';
import { Config } from './helpers/config.helper';
import * as requestIp from 'request-ip';
import { CORS_OPTION } from './constants/server.constatnt';
dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;
const HOST: string = process.env.APP_HOST || '0.0.0.0';

/** Initialize database */
Connection.initialize()
  .then(() => {
    console.log('Database connected!'); /** Log if database connected */

    /** Initialize Cron Job */
    if (Config.getBoolean('IS_ACTIVATE_CRON')) {
      console.log('Cron job is running!');
      initializeCronJob();
    } else {
      console.log('Cron job is not running!');
    }
  })
  .catch((error) => console.log({ message: 'Database connection failed!', error: error.message }));

/** Initialize middleware */
app.use(cors({ ...CORS_OPTION }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestIp.mw());

/** Router Import */
import indexRouter from './routes/index';
import { COOKIES_OPTIONS, SAME_SITE_COOKIES, SECURE_COOKIES } from './constants/auth.constant';

/** Routes Release */
app.use('/api/v1/', indexRouter);

console.log('SECURE_COOKIES', SECURE_COOKIES);
console.log('SAME_SITE_COOKIES', SAME_SITE_COOKIES);
console.log('COOKIES_OPTIONS', COOKIES_OPTIONS);

/** Error Handling */
app.use(error404);
app.use(logErrors);
app.use(clientErrorHandler);

/** Server listen */
app.listen(PORT, HOST, () => {
  console.log(`Server is listening on port: ${PORT}, on http://localhost:${PORT}`);
});
app.on('error', onError);

export default app;
