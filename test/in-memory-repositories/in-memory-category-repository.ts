import { CategoryRepository } from '@/domain/application/repositories/category-repository'
import { Category } from '@/domain/enterprise/entities/Category'

export class InMemoryCategoryRepository implements CategoryRepository {
  items: Category[] = []

  async create(category: Category) {
    this.items.push(category)
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id.toString() === id)

    return category ?? null
  }

  async findMany() {
    return this.items
  }
}
