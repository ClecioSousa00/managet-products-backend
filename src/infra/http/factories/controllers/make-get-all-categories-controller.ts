import { CategoryPrismaRepository } from '@/infra/database/prisma/repositories/category-prisma-repository'
import { makeUserRepository } from '../repositories/user-repository-factory'
import { GetAllCategoriesUseCase } from '@/domain/application/use-cases/category/get-all-categories-use-case'
import { GetAllCategoriesController } from '@/infra/controllers/category/get-all-categories-controller'

export const makeGetAllCategoriesController = () => {
  const userRepository = makeUserRepository()
  const categoryRepository = new CategoryPrismaRepository()

  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
    categoryRepository,
    userRepository,
  )
  const getAllCategoriesController = new GetAllCategoriesController(
    getAllCategoriesUseCase,
  )
  return getAllCategoriesController
}
