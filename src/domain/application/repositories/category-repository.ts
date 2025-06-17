import { Category } from '@/domain/enterprise/entities/Category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export interface CategoryRepository {
  create(category: Category): Promise<void>
  findById(id: UniqueEntityId): Promise<Category | null>
  findMany(): Promise<Category[]>
}
