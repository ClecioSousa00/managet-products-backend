import { z } from 'zod'

import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'

import { Controller, HttpRequest, HttpResponse } from '@/shared/controller'
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'

import { StatusCodes } from 'http-status-codes'

import { validateRequest } from '@/infra/http/middleware/validation-request'

const registerBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

type RegisterBodyUser = z.infer<typeof registerBodySchema>

export const registerValidationUser = validateRequest(
  'body',
  registerBodySchema,
)

type RegisterRequest = HttpRequest<RegisterBodyUser>

export class RegisterUserController implements Controller {
  constructor(private registerUseCase: RegisterUserUseCase) {}

  async handle(request: RegisterRequest): Promise<HttpResponse> {
    const { email, password, username } = request.body
    try {
      await this.registerUseCase.execute({
        email,
        password,
        username,
      })

      return {
        status: StatusCodes.CREATED,
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
