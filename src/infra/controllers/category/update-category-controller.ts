import { UpdateCategoryUseCase } from '@/domain/application/use-cases/category/update-category-use-case'
import { UpdateCategoryRequest } from '@/infra/http/schema-validations/categories/update-category-validation'
import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { StatusCodes } from 'http-status-codes'

export class UpdateCategoryController implements Controller {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {}

  async handle(request: UpdateCategoryRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { name } = request.body
    const { id } = request.params
    try {
      await this.updateCategoryUseCase.execute({
        userId,
        id,
        name,
      })

      return {
        status: StatusCodes.OK,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
