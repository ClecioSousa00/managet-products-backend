import { ProductRepository } from '@/domain/application/repositories/product-repository'
import { Product } from '@/domain/enterprise/entities/Product'

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = []

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }
}
