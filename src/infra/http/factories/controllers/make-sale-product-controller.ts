import { CreateSaleProductUseCase } from '@/domain/application/use-cases/sale-product/create-sale-product-use-case';
import { CreateSaleProductController } from '@/infra/controllers/sale-product/create-sale-product-controller';
import { makeProductRepository } from '../repositories/product-repository-factory';
import { makeSaleProductRepository } from '../repositories/sale-product-repository-factory';
import { makeUserRepository } from '../repositories/user-repository-factory';

export const makeCreateSaleProductController = () => {
  const userRepository = makeUserRepository();
  const saleProductRepository = makeSaleProductRepository();
  const productRepository = makeProductRepository();

  const createSaleProductUseCase = new CreateSaleProductUseCase(
    userRepository,
    productRepository,
    saleProductRepository
  );
  const createSaleProductController = new CreateSaleProductController(
    createSaleProductUseCase
  );
  return createSaleProductController;
};
