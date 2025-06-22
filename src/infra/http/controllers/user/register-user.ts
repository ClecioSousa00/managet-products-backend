import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'
import { validationData } from '../../middleware/validationData'

const registerBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

export const registerValidation = validationData('body', registerBodySchema)

export async function RegisterUser(req: Request, res: Response) {
  const { email, password, username } = registerBodySchema.parse(req.body)

  try {
    const userRepository = new UserPrismaRepository()
    const registerUseCase = new RegisterUserUseCase(userRepository)

    await registerUseCase.execute({ email, password, username })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      res.status(StatusCodes.CONFLICT).json({
        message: error.message,
      })
    }
  }

  res.status(StatusCodes.OK).json()
}
