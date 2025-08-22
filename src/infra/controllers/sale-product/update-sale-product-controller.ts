import { StatusCodes } from 'http-status-codes';
import type { UpdateSaleProductUseCase } from '@/domain/application/use-cases/sale-product/update-sale-product-use-case';
import type { UpdateSaleProductRequest } from '@/infra/http/schema-validations/sale-products/update-sale-product-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class UpdateSaleProductController implements Controller {
  constructor(private updateSaleProductUseCase: UpdateSaleProductUseCase) {}
  async handle(request: UpdateSaleProductRequest): Promise<HttpResponse> {
    const userId = request.userId;
    const { id: saleProductId } = request.params;
    const { quantity, salePriceAtTime } = request.body;
    try {
      await this.updateSaleProductUseCase.execute({
        saleProductId,
        userId,
        quantity,
        salePriceAtTime,
      });
      return {
        status: StatusCodes.NO_CONTENT,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
