import { UpdateProductUseCase } from '@/domain/application/use-cases/product/update-product-use-case'
import { UpdateProductRequest } from '@/infra/http/schema-validations/products/update-product-validation'
import { Controller, HttpResponse } from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { StatusCodes } from 'http-status-codes'

export class UpdateProductController implements Controller {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  async handle(request: UpdateProductRequest): Promise<HttpResponse> {
    const userId = request.userId
    const productUpdateProps = request.body
    const { id } = request.params
    try {
      await this.updateProductUseCase.execute({
        id,
        userId,
        ...productUpdateProps,
      })

      return {
        status: StatusCodes.NO_CONTENT,
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
