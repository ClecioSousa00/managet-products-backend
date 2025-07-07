import { StatusCodes } from 'http-status-codes'

import { GetAllProductsUseCase } from '@/domain/application/use-cases/product/get-all-products-use-case'

import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { GetAllProductRequest } from '@/infra/http/schema-validations/products/get-all-products-validation'

export class GetAllProductsController implements Controller {
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  async handle(request: GetAllProductRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { limit, page, orderBy, orderDirection } = request.query

    try {
      const { products, pagination } = await this.getAllProductsUseCase.execute(
        {
          userId,
          limit: Number(limit),
          page,
          orderBy,
          orderDirection,
        },
      )
      return {
        status: StatusCodes.OK,
        body: {
          products,
          pagination,
        },
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
