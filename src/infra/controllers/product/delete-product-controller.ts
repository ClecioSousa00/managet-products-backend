import { StatusCodes } from 'http-status-codes'

import { DeleteProductUseCase } from '@/domain/application/use-cases/product/delete-product-use-case'

import { DeleteProductRequest } from '@/infra/http/schema-validations/products/delete-product-validation'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'

export class DeleteProductController implements Controller {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}

  async handle(request: DeleteProductRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { id } = request.params

    try {
      await this.deleteProductUseCase.execute({ productId: id, userId })

      return {
        status: StatusCodes.NO_CONTENT,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
