import { Category } from '@/domain/enterprise/entities/Category'

export interface CategoryRepository {
  create(category: Category): Promise<void>
  findById(id: string): Promise<Category | null>
  findMany(): Promise<Category[]>
}
