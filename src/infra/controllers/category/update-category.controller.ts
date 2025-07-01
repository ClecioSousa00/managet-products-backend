import { UpdateCategoryUseCase } from '@/domain/application/use-cases/category/update-category-use-case'
import { validateRequest } from '@/infra/http/middleware/validation-request'
import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

const updateCategoryParamsSchema = z.object({
  id: z.string(),
})

const updateCategoryBodySchema = z.object({
  name: z.string().min(3),
})

type UpdateCategoryParamsSchema = z.infer<typeof updateCategoryParamsSchema>
type UpdateCategoryBodySchema = z.infer<typeof updateCategoryBodySchema>

export const updateCategoryParamsValidation = validateRequest(
  'params',
  updateCategoryParamsSchema,
)
export const updateCategoryBodyValidation = validateRequest(
  'body',
  updateCategoryBodySchema,
)

type UpdateCategoryRequest = AuthenticatedHttpRequest<
  UpdateCategoryBodySchema,
  UpdateCategoryParamsSchema
>

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
