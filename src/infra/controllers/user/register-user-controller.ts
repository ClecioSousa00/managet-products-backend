import { StatusCodes } from 'http-status-codes';
import type { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case';
import type { RegisterRequest } from '@/infra/http/schema-validations/user/register-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

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
        body: { message: 'User created successfully' },
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
