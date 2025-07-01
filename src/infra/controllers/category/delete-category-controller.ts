import { z } from 'zod'

import { DeleteCategoryUseCase } from '@/domain/application/use-cases/category/delete-category-user-case'

import { StatusCodes } from 'http-status-codes'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

import { validateRequest } from '@/infra/http/middleware/validation-request'

const deleteCategoryParamsSchema = z.object({
  id: z.string(),
})

type DeleteCategoryParams = z.infer<typeof deleteCategoryParamsSchema>

export const deleteCategoryValidation = validateRequest(
  'params',
  deleteCategoryParamsSchema,
)

type DeleteCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteCategoryParams
>

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
