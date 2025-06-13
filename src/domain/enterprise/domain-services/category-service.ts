import { CategoryRepository } from '@/domain/application/repositories/category-repository'

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategoryNameById(id: string): Promise<string> {
    const category = await this.categoryRepository.findById(id)
    return category?.name ?? ''
  }
}
