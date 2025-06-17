import { CategoryRepository } from '@/domain/application/repositories/category-repository'
import { Category } from '@/domain/enterprise/entities/Category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export class InMemoryCategoryRepository implements CategoryRepository {
  items: Category[] = []

  async create(category: Category) {
    this.items.push(category)
  }

  async findById(id: UniqueEntityId) {
    const category = this.items.find((item) => item.id.equals(id))

    return category ?? null
  }

  async findMany() {
    return this.items
  }
}
