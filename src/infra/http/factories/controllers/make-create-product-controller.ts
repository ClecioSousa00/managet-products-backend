import { CreateProductUseCase } from '@/domain/application/use-cases/product/create-product-use-case'

import { CreateProductController } from '@/infra/controllers/product/create-product-controller'

import { makeUserRepository } from '../repositories/user-repository-factory'
import { makeCategoryRepository } from '../repositories/category-repository-factory'
import { makeProductRepository } from '../repositories/product-repository-factory'

export const makeCreateProductController = () => {
  const userRepository = makeUserRepository()
  const categoryRepository = makeCategoryRepository()
  const productRepository = makeProductRepository()

  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    userRepository,
    categoryRepository,
  )
  const createProductController = new CreateProductController(
    createProductUseCase,
  )
  return createProductController
}
