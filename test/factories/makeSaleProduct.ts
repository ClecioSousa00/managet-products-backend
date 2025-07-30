import {
  SaleProduct,
  SaleProductProps,
} from '@/domain/enterprise/entities/sale-product'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export const makeSaleProduct = (
  override: Partial<SaleProductProps> = {},
  id?: UniqueEntityId,
): SaleProduct => {
  const product = SaleProduct.create(
    {
      productId: new UniqueEntityId(),
      userId: new UniqueEntityId(),
      quantity: 1,
      salePriceAtTime: 1000,
      ...override,
    },
    id,
  )

  return product
}
