import { DeleteProductUseCase } from '@/domain/application/use-cases/product/delete-product-use-case'

import { DeleteProductController } from '@/infra/controllers/product/delete-product-controller'

import { makeUserRepository } from '../repositories/user-repository-factory'
import { makeProductRepository } from '../repositories/product-repository-factory'

export const makeDeleteProductController = () => {
  const userRepository = makeUserRepository()
  const productRepository = makeProductRepository()

  const deleteProductUseCase = new DeleteProductUseCase(
    userRepository,
    productRepository,
  )
  const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
  )
  return deleteProductController
}
