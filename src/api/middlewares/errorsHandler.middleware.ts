/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';
import { logger } from '../../configs/logger';

@Middleware({ type: 'after', priority: 1 })
export class MiddlewareErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any): void {

    if (error.name === 'TokenExpiredError') {
      response.status(401).json({
        name: error.name,
        message: 'Token expirado ou inválido!',
        stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined
      });

    } else if (error.errors) { 
      response.status(400).json({
        name: 'ValidationError',
        message: 'Body Inválido!',
        errors: error.errors,
        stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined
      });
    } else {
      logger.error(error);
      response.status(error.httpCode || 500).json({
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined
      });
    }

    next();
  }
}