import { StatusCodes } from 'http-status-codes';
import type { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case';
import type { RegisterRequest } from '@/infra/http/schema-validations/user/register-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

export class RegisterUserController implements Controller {
  constructor(private registerUseCase: RegisterUserUseCase) {}

  async handle(request: RegisterRequest): Promise<HttpResponse> {
    const { email, password, username } = request.body;
    try {
      await this.registerUseCase.execute({
        email,
        password,
        username,
      });

      return {
        status: StatusCodes.CREATED,
      };
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return {
          status: StatusCodes.CONFLICT,
          body: { message: error.message },
        };
      }

      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: { message: 'Internal server error' },
      };
    }
  }
}
