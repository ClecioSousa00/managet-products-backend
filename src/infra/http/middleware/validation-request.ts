import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError, type ZodTypeAny } from 'zod';
import { env } from '@/env';

type Fields = 'body' | 'header' | 'params' | 'query';

type Validation = (field: Fields, schema: ZodTypeAny) => RequestHandler;

export const validateRequest: Validation = (field, schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req[field]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid data', details: errorMessages });
      } else {
        if (env.NODE_ENV !== 'production') {
          console.error(error);
        }
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  };
};
