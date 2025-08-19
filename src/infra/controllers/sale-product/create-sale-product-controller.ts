import { StatusCodes } from 'http-status-codes';
import type { CreateSaleProductUseCase } from '@/domain/application/use-cases/sale-product/create-sale-product-use-case';
import type { CreateSaleProductRequest } from '@/infra/http/schema-validations/sale-products/create-sale-product-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class CreateSaleProductController implements Controller {
  constructor(private createSaleProductUseCase: CreateSaleProductUseCase) {}

  async handle(request: CreateSaleProductRequest): Promise<HttpResponse> {
    const userId = request.userId;
    const { productId, quantity, salePriceAtTime } = request.body;
    try {
      const { id } = await this.createSaleProductUseCase.execute({
        productId,
        userId,
        quantity,
        salePriceAtTime,
      });

      return {
        status: StatusCodes.CREATED,
        body: { id },
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
