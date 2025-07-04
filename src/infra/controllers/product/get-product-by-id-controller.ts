import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

import { GetProductByIdUseCase } from '@/domain/application/use-cases/product/get-product-by-id-use-case'

import { validateRequest } from '@/infra/http/middleware/validation-request'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

const getProductParamsSchema = z.object({
  id: z.string(),
})

type GetProductParams = z.infer<typeof getProductParamsSchema>

export const getProductByIdValidation = validateRequest(
  'params',
  getProductParamsSchema,
)

type GetProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  GetProductParams
>

export class GetProductByIdController implements Controller {
  constructor(private getProductByIdUseCase: GetProductByIdUseCase) {}

  async handle(request: GetProductRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { id } = request.params

    try {
      const product = await this.getProductByIdUseCase.execute({
        productId: id,
        userId,
      })

      return {
        status: StatusCodes.OK,
        body: {
          product,
        },
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
