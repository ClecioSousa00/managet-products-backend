// import { Request, Response } from 'express'
// import { StatusCodes } from 'http-status-codes'
// import { z } from 'zod'
// import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
// import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'
// import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'
// import { validateRequest } from '@/infra/http/middleware/validation-request'

// const registerBodySchema = z.object({
//   username: z.string().min(3),
//   email: z.string().email(),
//   password: z.string().min(8),
// })

// export const registerValidation = validateRequest('body', registerBodySchema)

// export async function RegisterUser(req: Request, res: Response) {
//   const { email, password, username } = registerBodySchema.parse(req.body)

//   try {
//     const userRepository = new UserPrismaRepository()
//     const registerUseCase = new RegisterUserUseCase(userRepository)

//     await registerUseCase.execute({ email, password, username })
//   } catch (error) {
//     if (error instanceof UserAlreadyExistsError) {
//       res.status(StatusCodes.CONFLICT).json({
//         message: error.message,
//       })
//     }
//   }

//   res.status(StatusCodes.OK).json()
// }

import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'
import { RegisterBodyUser } from '@/infra/http/validation/register-validation-user'
import { Controller, HttpRequest, HttpResponse } from '@/shared/controller'

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'
import { StatusCodes } from 'http-status-codes'

type RegisterRequest = HttpRequest & { body: RegisterBodyUser }

export class RegisterUserController implements Controller {
  constructor(private readonly registerUseCase: RegisterUserUseCase) {}

  async handle(request: RegisterRequest): Promise<HttpResponse> {
    const { email, password, username } = request.body
    try {
      await this.registerUseCase.execute({ email, password, username })

      return {
        status: StatusCodes.OK,
      }
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return {
          status: StatusCodes.CONFLICT,
          body: { message: error.message },
        }
      }

      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal server error' },
      }
    }
  }
}
