import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

import { CreateCategoryUseCase } from '@/domain/application/use-cases/category/create-category-use-case'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

import { validateRequest } from '@/infra/http/middleware/validation-request'

const createCategoryBodySchema = z.object({
  name: z.string().min(3),
})

type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>

export const createCategoryValidation = validateRequest(
  'body',
  createCategoryBodySchema,
)

type CreateCategoryRequest = AuthenticatedHttpRequest<CreateCategoryBody>

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
