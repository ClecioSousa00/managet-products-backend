import { Category } from '@/domain/enterprise/entities/category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { Category as PrismaCategory } from '@prisma/client'

export class CategoryPrismaMapper {
  static toDomain(data: PrismaCategory): Category {
    return Category.create(
      {
        userId: new UniqueEntityId(data.userId),
        name: data.name,
      },
      new UniqueEntityId(data.id),
    )
  }

  static toPrisma(category: Category): PrismaCategory {
    return {
      id: category.id.toString(),
      userId: category.userId.toString(),
      name: category.name,
    }
  }
}
