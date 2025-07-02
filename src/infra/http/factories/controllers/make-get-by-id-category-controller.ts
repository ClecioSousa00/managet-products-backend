import { GetByIdCategoryUseCase } from '@/domain/application/use-cases/category/get-by-id-category-use-case'

import { GetByIdCategoryController } from '@/infra/controllers/category/get-by-id-category-controller'

import { makeCategoryRepository } from '../repositories/category-repository-factory'
import { makeUserRepository } from '../repositories/user-repository-factory'

export const makeGetByIdCategoryController = () => {
  const userRepository = makeUserRepository()
  const categoryRepository = makeCategoryRepository()

  const getByIdCategoryUseCase = new GetByIdCategoryUseCase(
    categoryRepository,
    userRepository,
  )
  const getByIdCategoryController = new GetByIdCategoryController(
    getByIdCategoryUseCase,
  )

  return getByIdCategoryController
}
