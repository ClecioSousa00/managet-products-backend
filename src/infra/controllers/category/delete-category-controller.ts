import { DeleteCategoryUseCase } from '@/domain/application/use-cases/category/delete-category-user-case'

import { StatusCodes } from 'http-status-codes'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

import { DeleteCategoryRequest } from '@/infra/http/schema-validations/categories/delete-category-validation'

export class DeleteCategoryController implements Controller {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  async handle(request: DeleteCategoryRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { id } = request.params

    try {
      await this.deleteCategoryUseCase.execute({ userId, id })
      return {
        status: StatusCodes.NO_CONTENT,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
