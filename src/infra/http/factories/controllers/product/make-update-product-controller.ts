import { UpdateProductUseCase } from '@/domain/application/use-cases/product/update-product-use-case';
import { UpdateProductController } from '@/infra/controllers/product/update-product-controller';
import { makeCategoryRepository } from '../../repositories/category-repository-factory';
import { makeProductRepository } from '../../repositories/product-repository-factory';
import { makeUserRepository } from '../../repositories/user-repository-factory';

export const makeUpdateProductController = () => {
  const userRepository = makeUserRepository();
  const categoryRepository = makeCategoryRepository();
  const productRepository = makeProductRepository();

  const updateProductUseCase = new UpdateProductUseCase(
    productRepository,
    userRepository,
    categoryRepository
  );
  const updateProductController = new UpdateProductController(
    updateProductUseCase
  );
  return updateProductController;
};
