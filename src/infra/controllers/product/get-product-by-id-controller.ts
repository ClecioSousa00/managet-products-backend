import { StatusCodes } from 'http-status-codes'

import { GetProductByIdUseCase } from '@/domain/application/use-cases/product/get-product-by-id-use-case'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { GetProductRequest } from '@/infra/http/schema-validations/products/get-product-by-id-validation'

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
