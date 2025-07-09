import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'

import { StatusCodes } from 'http-status-codes'

import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error'
import { Controller, HttpResponse } from '@/shared/controller'

import { JWTService } from '@/infra/auth/jwt'
import { AuthenticateRequest } from '@/infra/http/schema-validations/user/authenticate-validation'

export class AuthenticateUserController implements Controller {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private jwtService: JWTService,
  ) {}

  async handle(request: AuthenticateRequest): Promise<HttpResponse> {
    const { email, password } = request.body
    try {
      const { id } = await this.authenticateUserUseCase.execute({
        email,
        password,
      })

      const payload = {
        sub: id,
      }

      const token = this.jwtService.sign(payload)

      return {
        status: StatusCodes.OK,
        body: {
          accessToken: token,
        },
      }
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        return {
          status: StatusCodes.UNAUTHORIZED,
          body: {
            message: error.message,
          },
        }
      }
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal server error' },
      }
    }
  }
}
