import { StatusCodes } from 'http-status-codes';
import type { GetAllSaleProductUseCase } from '@/domain/application/use-cases/sale-product/get-all-sale-products-use-case';
import type { GetAllProductRequest } from '@/infra/http/schema-validations/products/get-all-products-validation';
import type { Controller, HttpResponse } from '@/shared/controller';
import { handleControllerError } from '@/shared/http/handle-controller-error';

export class GetAllSaleProductsController implements Controller {
  constructor(private getAllSaleProductsUseCase: GetAllSaleProductUseCase) {}
  async handle(request: GetAllProductRequest): Promise<HttpResponse> {
    const userId = request.userId;
    const { limit, page, orderBy, orderDirection } = request.query;
    try {
      const { pagination, saleProducts } =
        await this.getAllSaleProductsUseCase.execute({
          limit: Number(limit),
          page,
          userId,
          orderBy,
          orderDirection,
        });

      return {
        status: StatusCodes.OK,
        body: {
          saleProducts,
          pagination,
        },
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
