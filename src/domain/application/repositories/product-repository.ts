import { Product } from '@/domain/enterprise/entities/Product'

export interface ProductRepository {
  create(product: Product): Promise<void>
}
