import { StatusCodes } from 'http-status-codes';
import type { GetSaleProductByIdUseCase } from '@/domain/application/use-cases/sale-product/get-sale-product-by-id-use-case';
import type { GetSaleProductRequest } from '@/infra/http/schema-validations/sale-products/get-sale-product-by-id-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class GetSaleProductByIdController implements Controller {
  constructor(private getSaleProductUseCase: GetSaleProductByIdUseCase) {}
  async handle(request: GetSaleProductRequest): Promise<HttpResponse> {
    const userId = request.userId;
    const { id: saleProductId } = request.params;

    try {
      const saleProduct = await this.getSaleProductUseCase.execute({
        saleProductId,
        userId,
      });

      return {
        status: StatusCodes.OK,
        body: { saleProduct },
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
