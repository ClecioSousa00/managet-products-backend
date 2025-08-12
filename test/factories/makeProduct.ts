import { randomUUID } from 'node:crypto';
import {
  Product,
  type ProductProps,
} from '@/domain/enterprise/entities/product';
import { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export const makeProduct = (
  override: Partial<ProductProps> = {},
  id?: UniqueEntityId
): Product => {
  const product = Product.create(
    {
      name: 'NoteBook',
      purchasePrice: 2500,
      salePrice: 3000,
      quantity: 1,
      categoryId: randomUUID(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return product;
};
