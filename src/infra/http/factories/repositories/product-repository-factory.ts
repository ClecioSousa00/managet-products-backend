import { ProductPrismaRepository } from '@/infra/database/prisma/repositories/product-prisma-repostiroy'

const productRepository = new ProductPrismaRepository()

export const makeProductRepository = () => {
  return productRepository
}
