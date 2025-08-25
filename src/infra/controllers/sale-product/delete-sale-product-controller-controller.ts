import { StatusCodes } from 'http-status-codes';
import type { DeleteSaleProductUseCase } from '@/domain/application/use-cases/sale-product/delete-sale-product-use-case';
import type { DeleteSaleProductRequest } from '@/infra/http/schema-validations/sale-products/delete-sale-product-by-id-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class DeleteSaleProductController implements Controller {
  constructor(private deleteSaleProductUseCase: DeleteSaleProductUseCase) {}
  async handle(request: DeleteSaleProductRequest): Promise<HttpResponse> {
    const userId = request.userId;
    const { id } = request.params;

    try {
      await this.deleteSaleProductUseCase.execute({
        userId,
        saleProductId: id,
      });

      return {
        status: StatusCodes.NO_CONTENT,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
