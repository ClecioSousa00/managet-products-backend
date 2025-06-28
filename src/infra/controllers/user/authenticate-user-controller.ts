import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error'
import { StatusCodes } from 'http-status-codes'

import { Controller, HttpRequest, HttpResponse } from '@/shared/controller'
import { JWTService } from '@/infra/auth/jwt'
import { AuthenticateUserBody } from '@/infra/http/validation/users/authenticate-validation-user'

type AuthenticateRequest = HttpRequest<AuthenticateUserBody>

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
          id,
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
