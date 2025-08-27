import { DeleteSaleProductUseCase } from '@/domain/application/use-cases/sale-product/delete-sale-product-use-case';
import { DeleteSaleProductController } from '@/infra/controllers/sale-product/delete-sale-product-controller-controller';
import { makeProductRepository } from '../../repositories/product-repository-factory';
import { makeSaleProductRepository } from '../../repositories/sale-product-repository-factory';
import { makeUserRepository } from '../../repositories/user-repository-factory';

export const makeDeleteSaleProductController = () => {
  const userRepository = makeUserRepository();
  const saleProductRepository = makeSaleProductRepository();
  const productRepository = makeProductRepository();

  const deleteSaleProductUseCase = new DeleteSaleProductUseCase(
    userRepository,
    saleProductRepository,
    productRepository
  );
  const deleteSaleProductController = new DeleteSaleProductController(
    deleteSaleProductUseCase
  );
  return deleteSaleProductController;
};
