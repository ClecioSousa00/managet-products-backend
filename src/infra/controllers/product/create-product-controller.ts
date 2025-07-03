import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

import { CreateProductUseCase } from '@/domain/application/use-cases/product/create-product-use-case'

import { validateRequest } from '@/infra/http/middleware/validation-request'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

const createProductBodySchema = z.object({
  categoryId: z.string(),
  name: z.string().min(3),
  quantity: z.number(),
  salePrice: z.number(),
  purchasePrice: z.number(),
})

type CreateProductBody = z.infer<typeof createProductBodySchema>

export const CreateProductBodyValidation = validateRequest(
  'body',
  createProductBodySchema,
)

type CreateProductRequest = AuthenticatedHttpRequest<CreateProductBody>

export class CreateProductController implements Controller {
  constructor(private createProductUseCase: CreateProductUseCase) {}
  async handle(request: CreateProductRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { categoryId, name, purchasePrice, quantity, salePrice } =
      request.body

    try {
      await this.createProductUseCase.execute({
        userId,
        categoryId,
        name,
        purchasePrice,
        quantity,
        salePrice,
      })

      return {
        status: StatusCodes.OK,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
