import { StatusCodes } from 'http-status-codes';
import type { GetProfileUserUseCase } from '@/domain/application/use-cases/user/get-profile-user-use-case';
import type {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class GetProfileUserController implements Controller {
  constructor(private getProfileUserUseCase: GetProfileUserUseCase) {}

  async handle(request: AuthenticatedHttpRequest): Promise<HttpResponse> {
    const userId = request.userId;

    try {
      const { email, username } = await this.getProfileUserUseCase.execute({
        userId,
      });

      return {
        status: StatusCodes.OK,
        body: {
          email,
          username,
        },
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
