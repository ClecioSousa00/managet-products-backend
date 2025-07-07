import { StatusCodes } from 'http-status-codes'

import { GetByIdCategoryUseCase } from '@/domain/application/use-cases/category/get-by-id-category-use-case'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { GetByIdCategoryRequest } from '@/infra/http/schema-validations/categories/get-category-by-id-validation'

export class GetByIdCategoryController implements Controller {
  constructor(private getByIdCategoryUseCase: GetByIdCategoryUseCase) {}

  async handle(request: GetByIdCategoryRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { id } = request.params

    try {
      const category = await this.getByIdCategoryUseCase.execute({ id, userId })

      return {
        status: StatusCodes.OK,
        body: {
          name: category.name,
          id: category.id,
        },
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
