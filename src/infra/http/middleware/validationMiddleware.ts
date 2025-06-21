import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ZodError, ZodTypeAny } from 'zod'
import { StatusCodes } from 'http-status-codes'

type Fields = 'body' | 'header' | 'params' | 'query'

type Validation = (field: Fields, schema: ZodTypeAny) => RequestHandler

export const validateData: Validation = (field, schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[field])
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }))
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Invalid data', details: errorMessages })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' })
      }
    }
  }
}
