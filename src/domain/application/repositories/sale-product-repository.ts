import type { SaleProduct } from '@/domain/enterprise/entities/sale-product';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export interface SaleProductRepository {
  create(saleProduct: SaleProduct): Promise<void>;
  findById(
    id: UniqueEntityId,
    userId: UniqueEntityId
  ): Promise<SaleProduct | null>;
  update(saleProduct: SaleProduct): Promise<void>;
}
