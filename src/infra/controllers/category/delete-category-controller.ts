import { StatusCodes } from 'http-status-codes';
import type { DeleteCategoryUseCase } from '@/domain/application/use-cases/category/delete-category-user-case';
import type { DeleteCategoryRequest } from '@/infra/http/schema-validations/categories/delete-category-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class DeleteCategoryController implements Controller {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  async handle(request: DeleteCategoryRequest): Promise<HttpResponse> {
    const userId = request.userId;
    const { id } = request.params;

    try {
      await this.deleteCategoryUseCase.execute({ userId, id });
      return {
        status: StatusCodes.NO_CONTENT,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
