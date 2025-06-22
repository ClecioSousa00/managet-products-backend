import { Request, Response } from 'express'
import { z } from 'zod'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error'
import { StatusCodes } from 'http-status-codes'

import { validateRequest } from '../../middleware/validation-request'
import { JWTService } from '@/infra/auth/jwt'
import { InvalidTokenError } from '@/shared/errors/invalid-token-error'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authenticateValidation = validateRequest(
  'body',
  authenticateBodySchema,
)

export async function AuthenticateUser(req: Request, res: Response) {
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const userRepository = new UserPrismaRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(userRepository)

    const { id } = await authenticateUseCase.execute({ email, password })

    const payload = {
      sub: id,
    }

    const token = JWTService.sign(payload)

    res.status(StatusCodes.OK).json({ accessToken: token })
  } catch (error) {
    if (
      error instanceof WrongCredentialsError ||
      error instanceof InvalidTokenError
    ) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: error.message,
      })
    }
  }
}
