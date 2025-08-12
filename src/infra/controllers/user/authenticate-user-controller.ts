import { StatusCodes } from 'http-status-codes';
import type { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case';
import type { JWTService } from '@/infra/auth/jwt';
import type { AuthenticateRequest } from '@/infra/http/schema-validations/user/authenticate-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error';

export class AuthenticateUserController implements Controller {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private jwtService: JWTService
  ) {}

  async handle(request: AuthenticateRequest): Promise<HttpResponse> {
    const { email, password } = request.body;
    try {
      const { id } = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      const payload = {
        sub: id,
      };

      const token = this.jwtService.sign(payload);

      return {
        status: StatusCodes.OK,
        body: {
          accessToken: token,
        },
      };
    } catch (error) {
      if (error instanceof WrongCredentialsError) {
        return {
          status: StatusCodes.UNAUTHORIZED,
          body: {
            message: error.message,
          },
        };
      }
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal server error' },
      };
    }
  }
}
