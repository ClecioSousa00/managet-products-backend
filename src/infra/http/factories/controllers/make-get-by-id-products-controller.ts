import { makeUserRepository } from '../repositories/user-repository-factory'
import { makeCategoryRepository } from '../repositories/category-repository-factory'
import { makeProductRepository } from '../repositories/product-repository-factory'

import { GetProductByIdUseCase } from '@/domain/application/use-cases/product/get-product-by-id-use-case'

import { GetProductByIdController } from '@/infra/controllers/product/get-product-by-id-controller'

export const makeGetProductByIdController = () => {
  const userRepository = makeUserRepository()
  const categoryRepository = makeCategoryRepository()
  const productRepository = makeProductRepository()

  const getProductByIdUseCase = new GetProductByIdUseCase(
    productRepository,
    userRepository,
    categoryRepository,
  )
  const getProductByIdController = new GetProductByIdController(
    getProductByIdUseCase,
  )
  return getProductByIdController
}
