import { StatusCodes } from 'http-status-codes'
import { CreateCategoryUseCase } from '@/domain/application/use-cases/category/create-category-use-case'

import { CreateCategoryBody } from '@/infra/http/validation/categories/create-category-validation'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

type CreateCategoryRequest = AuthenticatedHttpRequest<CreateCategoryBody>

export class CreateCategoryController implements Controller {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(request: CreateCategoryRequest): Promise<HttpResponse> {
    const { categoryName } = request.body
    const userId = request.userId
    try {
      await this.createCategoryUseCase.execute({ categoryName, userId })

      return {
        status: StatusCodes.CREATED,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
