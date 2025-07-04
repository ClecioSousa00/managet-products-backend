import { CategoryRepository } from '@/domain/application/repositories/category-repository'
import { Category } from '@/domain/enterprise/entities/Category'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export class InMemoryCategoryRepository implements CategoryRepository {
  items: Category[] = []

  async create(category: Category) {
    this.items.push(category)
  }

  async findById(id: UniqueEntityId, userId: UniqueEntityId) {
    const category = this.items.find(
      (item) => item.id.equals(id) && item.userId.equals(userId),
    )

    return category ?? null
  }

  async findMany() {
    return this.items
  }

  async findByName(name: string, userId: UniqueEntityId) {
    const normalizedCategoryName = name.trim().toLowerCase()

    const category = this.items.find(
      (item) =>
        item.name.trim().toLowerCase() === normalizedCategoryName &&
        item.userId.equals(userId),
    )

    return category ?? null
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(id))

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  async update(category: Category): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(category.id))

    if (index !== -1) {
      this.items[index] = category
    }
  }
}
