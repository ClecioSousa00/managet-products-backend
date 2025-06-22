import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export async function CreateCategory(req: Request, res: Response) {
  res.status(StatusCodes.OK).send({ message: 'autorizado' })
}
