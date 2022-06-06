import * as dotenv from 'dotenv';
import { Response, Request, NextFunction } from 'express';
dotenv.config();

export function normalizePort(value: string) {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    // named pipe
    return value;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
const PORT: string = process.env.PORT || '5000';
export function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function error404(_: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    status: 404,
    message: 'Not Found',
  });
  next();
}

export function logErrors(err: any, _: Request, __: Response, next: NextFunction) {
  console.error(err.stack);
  next(err);
}

export function clientErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
