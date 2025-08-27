import { GetAllProductsUseCase } from '@/domain/application/use-cases/product/get-all-products-use-case';

import { GetAllProductsController } from '@/infra/controllers/product/get-all-products-controller';
import { makeCategoryRepository } from '../../repositories/category-repository-factory';
import { makeProductRepository } from '../../repositories/product-repository-factory';
import { makeUserRepository } from '../../repositories/user-repository-factory';

export const makeGetAllProductsController = () => {
  const userRepository = makeUserRepository();
  const categoryRepository = makeCategoryRepository();
  const productRepository = makeProductRepository();

  const getAllProductsUseCase = new GetAllProductsUseCase(
    productRepository,
    userRepository,
    categoryRepository
  );
  const getAllProductsController = new GetAllProductsController(
    getAllProductsUseCase
  );
  return getAllProductsController;
};
