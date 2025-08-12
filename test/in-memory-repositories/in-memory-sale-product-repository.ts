import type { SaleProductRepository } from '@/domain/application/repositories/sale-product-repository';
import type { SaleProduct } from '@/domain/enterprise/entities/sale-product';

import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export class InMemorySaleProductRepository implements SaleProductRepository {
  items: SaleProduct[] = [];

  async create(saleProduct: SaleProduct): Promise<void> {
    this.items.push(saleProduct);
  }

  async findById(
    id: UniqueEntityId,
    userId: UniqueEntityId
  ): Promise<SaleProduct | null> {
    const saleProduct = this.items.find(
      (product) => product.id.equals(id) && product.userId.equals(userId)
    );

    return saleProduct ?? null;
  }
}
