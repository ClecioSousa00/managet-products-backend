import { z } from 'zod'

import { StatusCodes } from 'http-status-codes'

import { GetByIdCategoryUseCase } from '@/domain/application/use-cases/category/get-by-id-category-use-case'

import { validateRequest } from '@/infra/http/middleware/validation-request'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

const categoryParamsSchema = z.object({
  id: z.string(),
})

type CategoryParams = z.infer<typeof categoryParamsSchema>

export const GetByIdCategoryValidation = validateRequest(
  'params',
  categoryParamsSchema,
)

type GetByIdCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  CategoryParams
>

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
