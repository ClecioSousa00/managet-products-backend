import { Category } from '@/domain/enterprise/entities/Category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export interface CategoryRepository {
  create(category: Category): Promise<void>
  findById(id: UniqueEntityId, userId: UniqueEntityId): Promise<Category | null>
  findMany(userId: UniqueEntityId): Promise<Category[]>
  findByName(name: string, userId: UniqueEntityId): Promise<Category | null>
  delete(id: UniqueEntityId): Promise<void>
  update(category: Category): Promise<void>
}
