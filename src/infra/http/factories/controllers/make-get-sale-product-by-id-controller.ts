import { GetSaleProductByIdUseCase } from '@/domain/application/use-cases/sale-product/get-sale-product-by-id-use-case';
import { GetSaleProductByIdController } from '@/infra/controllers/sale-product/get-sale-product-by-id-controller';
import { makeProductRepository } from '../repositories/product-repository-factory';
import { makeSaleProductRepository } from '../repositories/sale-product-repository-factory';
import { makeUserRepository } from '../repositories/user-repository-factory';

export const makeGetSaleProductByIdController = () => {
  const userRepository = makeUserRepository();
  const saleProductRepository = makeSaleProductRepository();
  const productRepository = makeProductRepository();

  const getSaleProductByIdUseCase = new GetSaleProductByIdUseCase(
    userRepository,
    saleProductRepository,
    productRepository
  );
  const getSaleProductByIdController = new GetSaleProductByIdController(
    getSaleProductByIdUseCase
  );
  return getSaleProductByIdController;
};
