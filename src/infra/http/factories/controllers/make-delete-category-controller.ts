import { DeleteCategoryUseCase } from '@/domain/application/use-cases/category/delete-category-user-case'

import { makeCategoryRepository } from '../repositories/category-repository-factory'
import { makeUserRepository } from '../repositories/user-repository-factory'

import { DeleteCategoryController } from '@/infra/controllers/category/delete-category-controller'

export const makeDeleteCategoryController = () => {
  const userRepository = makeUserRepository()
  const categoryRepository = makeCategoryRepository()

  const deleteCategoryUseCase = new DeleteCategoryUseCase(
    categoryRepository,
    userRepository,
  )
  const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
  )

  return deleteCategoryController
}
