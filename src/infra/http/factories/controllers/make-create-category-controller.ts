import { CreateCategoryUseCase } from '@/domain/application/use-cases/category/create-category-use-case';
import { CreateCategoryController } from '@/infra/controllers/category/create-category-controller';
import { makeCategoryRepository } from '../repositories/category-repository-factory';
import { makeUserRepository } from '../repositories/user-repository-factory';

export const makeCreateCategoryController = () => {
  const userRepository = makeUserRepository();
  const categoryRepository = makeCategoryRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(
    categoryRepository,
    userRepository
  );
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
