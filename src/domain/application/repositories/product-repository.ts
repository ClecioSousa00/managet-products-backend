import { OrderBy, OrderDirection, Pagination } from '@/shared/types/pagination'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { Product } from '@/domain/enterprise/entities/product'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findById(id: UniqueEntityId, userId: UniqueEntityId): Promise<Product | null>
  findMany(
    pagination: Pagination,
    userId: UniqueEntityId,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection,
  ): Promise<Product[]>
  count(): Promise<number>
  delete(id: UniqueEntityId): Promise<void>
  update(product: Product): Promise<void>
}
