import { CategoryPrismaRepository } from '@/infra/database/prisma/repositories/category-prisma-repository'

const categoryRepository = new CategoryPrismaRepository()

export const makeCategoryRepository = () => {
  return categoryRepository
}
