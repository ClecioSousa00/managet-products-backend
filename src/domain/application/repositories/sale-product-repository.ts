import { SaleProduct } from '@/domain/enterprise/entities/sale-product'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export interface SaleProductRepository {
  create(saleProduct: SaleProduct): Promise<void>
  findById(
    id: UniqueEntityId,
    userId: UniqueEntityId,
  ): Promise<SaleProduct | null>
}
