import { SaleProductRepository } from '@/domain/application/repositories/sale-product-repository'
import { SaleProduct } from '@/domain/enterprise/entities/sale-product'

export class InMemorySaleProductRepository implements SaleProductRepository {
  items: SaleProduct[] = []

  async create(saleProduct: SaleProduct): Promise<void> {
    this.items.push(saleProduct)
  }
}
