import { SaleProduct } from '@/domain/enterprise/entities/sale-product'

export interface SaleProductRepository {
  create(saleProduct: SaleProduct): Promise<void>
}
