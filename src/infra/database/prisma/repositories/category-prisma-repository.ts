import { CategoryRepository } from '@/domain/application/repositories/category-repository'
import { Category } from '@/domain/enterprise/entities/Category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { CategoryPrismaMapper } from '../mappers/category-prisma-mapper'
import { prisma } from '@/lib/prisma-client'

export class CategoryPrismaRepository implements CategoryRepository {
  async create(category: Category): Promise<void> {
    const data = CategoryPrismaMapper.toPrisma(category)
    await prisma.category.create({
      data,
    })
  }

  async findById(
    id: UniqueEntityId,
    userId: UniqueEntityId,
  ): Promise<Category | null> {
    const data = await prisma.category.findUnique({
      where: {
        id: id.toString(),
        AND: {
          userId: userId.toString(),
        },
      },
    })

    if (!data) return null

    const category = CategoryPrismaMapper.toDomain(data)

    return category
  }

  async findMany(userId: UniqueEntityId): Promise<Category[]> {
    const data = await prisma.category.findMany({
      where: {
        userId: userId.toString(),
      },
    })
    const categories: Category[] = data.map((item) => {
      const category = CategoryPrismaMapper.toDomain(item)
      return category
    })
    return categories
  }

  async findByName(
    name: string,
    userId: UniqueEntityId,
  ): Promise<Category | null> {
    const data = await prisma.category.findFirst({
      where: {
        name,
        AND: {
          userId: userId.toString(),
        },
      },
    })

    if (!data) return null

    return CategoryPrismaMapper.toDomain(data)
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await prisma.category.delete({
      where: {
        id: id.toString(),
      },
    })
  }

  async update(category: Category): Promise<void> {
    const data = CategoryPrismaMapper.toPrisma(category)
    await prisma.category.update({
      where: {
        id: category.id.toString(),
      },
      data,
    })
  }
}
