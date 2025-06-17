import { OrderBy, OrderDirection, Pagination } from '@/shared/types/pagination'
import { ProductRepository } from '@/domain/application/repositories/product-repository'
import { Product } from '@/domain/enterprise/entities/Product'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = []

  async create(product: Product) {
    this.items.push(product)
  }

  async findMany(
    { limit, offset }: Pagination,
    userId: UniqueEntityId,
    orderBy: OrderBy,
    orderDirection: OrderDirection,
  ) {
    const products = this.items.filter((item) => item.userId.equals(userId))

    const sorted = [...products].sort((a, b) => {
      let comparison = 0

      switch (orderBy) {
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

      return orderDirection === 'asc' ? comparison : -comparison
    })

    const paginated = sorted.slice(offset, offset + limit)
    return paginated
  }

  async count() {
    return this.items.length
  }

  async findById(id: UniqueEntityId, userId: UniqueEntityId) {
    const product = this.items.find(
      (item) => item.id.equals(id) && item.userId.equals(userId),
    )

    return product ?? null
  }

  async delete(
    userId: UniqueEntityId,
    productId: UniqueEntityId,
  ): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.userId.equals(userId) && item.id.equals(productId),
    )

    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  async update(product: Product, userId: UniqueEntityId): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.equals(product.id) && item.userId.equals(userId),
    )

    if (index !== -1) {
      this.items[index] = product
    }
  }
}
