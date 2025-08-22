import { UpdateSaleProductUseCase } from '@/domain/application/use-cases/sale-product/update-sale-product-use-case';
import { UpdateSaleProductController } from '@/infra/controllers/sale-product/update-sale-product-controller';
import { makeProductRepository } from '../repositories/product-repository-factory';
import { makeSaleProductRepository } from '../repositories/sale-product-repository-factory';
import { makeUserRepository } from '../repositories/user-repository-factory';

export const makeUpdateSaleProductController = () => {
  const userRepository = makeUserRepository();
  const saleProductRepository = makeSaleProductRepository();
  const productRepository = makeProductRepository();

  const updateSaleProductUseCase = new UpdateSaleProductUseCase(
    userRepository,
    saleProductRepository,
    productRepository
  );
  const updateSaleProductController = new UpdateSaleProductController(
    updateSaleProductUseCase
  );
  return updateSaleProductController;
};
