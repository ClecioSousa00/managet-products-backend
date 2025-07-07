import { StatusCodes } from 'http-status-codes'

import { CreateCategoryUseCase } from '@/domain/application/use-cases/category/create-category-use-case'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { CreateCategoryRequest } from '@/infra/http/schema-validations/categories/create-category-validation'

export class CreateCategoryController implements Controller {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: CreateCategoryRequest): Promise<HttpResponse> {
    const { name } = request.body
    const userId = request.userId

    try {
      await this.createCategoryUseCase.execute({ name, userId })

      return {
        status: StatusCodes.CREATED,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
