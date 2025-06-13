import { OrderBy, OrderDirection, Pagination } from '@/core/types/pagination'
import { ProductRepository } from '@/domain/application/repositories/product-repository'
import { Product } from '@/domain/enterprise/entities/Product'

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = []

  async create(product: Product): Promise<void> {
    this.items.push(product)
  }

  async findMany(
    { limit, offset }: Pagination,
    userId: string,
    orderBy: OrderBy,
    orderDirection: OrderDirection,
  ): Promise<Product[]> {
    const products = this.items.filter((item) => item.userId === userId)

    const orderField: OrderBy = orderBy ?? 'name'
    const orderDir: OrderDirection = orderDirection ?? 'asc'

    const sorted = [...products].sort((a, b) => {
      let comparison = 0

      switch (orderField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'date':
          comparison = a.createdAt.getTime() - b.createdAt.getTime()
          break
        case 'salePrice':
          comparison = a.salePrice - b.salePrice
          break
        case 'quantity':
          comparison = a.quantity - b.quantity
          break
      }

      return orderDir === 'asc' ? comparison : -comparison
    })

    const paginated = sorted.slice(offset, offset + limit)
    return paginated
  }

  async count() {
    return this.items.length
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id)

    return product ?? null
  }
}
