import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export async function CreateCategory(req: Request, res: Response) {
  console.log('headers', req.userId)

  res.status(StatusCodes.OK).send({ message: 'autorizado' })
}
