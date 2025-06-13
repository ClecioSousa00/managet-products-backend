import { OrderBy, OrderDirection, Pagination } from '@/core/types/pagination'
import { Product } from '@/domain/enterprise/entities/Product'

export interface ProductRepository {
  create(product: Product): Promise<void>
  findById(id: string): Promise<Product | null>
  findMany(
    pagination: Pagination,
    userId: string,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection,
  ): Promise<Product[]>
  count(): Promise<number>
}
