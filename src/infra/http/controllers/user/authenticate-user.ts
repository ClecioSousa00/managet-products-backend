import { Request, Response } from 'express'
import { z } from 'zod'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error'
import { StatusCodes } from 'http-status-codes'
import { validationData } from '../../middleware/validationData'

import * as jwt from 'jsonwebtoken'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authenticateValidation = validationData(
  'body',
  authenticateBodySchema,
)

export async function AuthenticateUser(req: Request, res: Response) {
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const userRepository = new UserPrismaRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(userRepository)

    const { id } = await authenticateUseCase.execute({ email, password })

    if (!process.env.JWT_SECRET) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      return
    }
    const payload = {
      sub: id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(StatusCodes.OK).json({ accessToken: token })
  } catch (error) {
    if (error instanceof WrongCredentialsError) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: error.message,
      })
    }
  }
}
