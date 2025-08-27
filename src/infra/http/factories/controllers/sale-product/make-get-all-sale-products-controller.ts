import { GetAllSaleProductUseCase } from '@/domain/application/use-cases/sale-product/get-all-sale-products-use-case';
import { GetAllSaleProductsController } from '@/infra/controllers/sale-product/get-all-sale-products-controller';
import { makeSaleProductQueryService } from '../../queries-service/sale-product-query-service-factory';
import { makeSaleProductRepository } from '../../repositories/sale-product-repository-factory';
import { makeUserRepository } from '../../repositories/user-repository-factory';

export const makeGetAllSaleProductsController = () => {
  const userRepository = makeUserRepository();
  const saleProductQueryService = makeSaleProductQueryService();
  const saleProductRepository = makeSaleProductRepository();

  const getAllSaleProductsUseCase = new GetAllSaleProductUseCase(
    userRepository,
    saleProductQueryService,
    saleProductRepository
  );
  const getAllSaleProductsController = new GetAllSaleProductsController(
    getAllSaleProductsUseCase
  );
  return getAllSaleProductsController;
};
