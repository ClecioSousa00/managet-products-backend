import { UpdateCategoryUseCase } from '@/domain/application/use-cases/category/update-category-use-case'

import { makeCategoryRepository } from '../repositories/category-repository-factory'
import { makeUserRepository } from '../repositories/user-repository-factory'

import { UpdateCategoryController } from '@/infra/controllers/category/update-category-controller'

export const makeUpdateCategoryController = () => {
  const userRepository = makeUserRepository()
  const categoryRepository = makeCategoryRepository()

  const updateCategoryUseCase = new UpdateCategoryUseCase(
    categoryRepository,
    userRepository,
  )
  const updateCategoryController = new UpdateCategoryController(
    updateCategoryUseCase,
  )

  return updateCategoryController
}
