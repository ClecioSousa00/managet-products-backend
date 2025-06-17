import { OrderBy, OrderDirection, Pagination } from '@/shared/types/pagination'
import { Product } from '@/domain/enterprise/entities/Product'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findById(id: UniqueEntityId): Promise<Product | null>
  findMany(
    pagination: Pagination,
    userId: UniqueEntityId,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection,
  ): Promise<Product[]>
  count(): Promise<number>
  delete(userId: UniqueEntityId, productId: UniqueEntityId): Promise<void>
}
