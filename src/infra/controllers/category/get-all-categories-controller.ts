import { StatusCodes } from 'http-status-codes';
import type { GetAllCategoriesUseCase } from '@/domain/application/use-cases/category/get-all-categories-use-case';

import type {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class GetAllCategoriesController implements Controller {
  constructor(private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

  async handle(request: AuthenticatedHttpRequest): Promise<HttpResponse> {
    const userId = request.userId;

    try {
      const { categories } = await this.getAllCategoriesUseCase.execute({
        userId,
      });

      return {
        status: StatusCodes.OK,
        body: {
          categories,
        },
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
