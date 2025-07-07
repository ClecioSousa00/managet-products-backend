import { StatusCodes } from 'http-status-codes'

import { CreateProductUseCase } from '@/domain/application/use-cases/product/create-product-use-case'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { CreateProductRequest } from '@/infra/http/schema-validations/products/create-produtc-validation'

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
        status: StatusCodes.CREATED,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
