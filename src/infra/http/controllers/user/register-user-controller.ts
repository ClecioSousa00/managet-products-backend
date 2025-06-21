import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { validateData } from '../../middleware/validationMiddleware'

const registerBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

export const registerValidation = validateData('body', registerBodySchema)

export async function RegisterUserController(req: Request, res: Response) {
  const { email, password, username } = registerBodySchema.parse(req.body)

  res.status(StatusCodes.OK).json()
}
