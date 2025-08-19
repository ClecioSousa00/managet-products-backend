import { Prisma, type SaleProduct as PrismaSaleProduct } from '@prisma/client';
import { SaleProduct } from '@/domain/enterprise/entities/sale-product';
import { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export class SaleProductPrismaMapper {
  static toDomain(data: PrismaSaleProduct): SaleProduct {
    return SaleProduct.create(
      {
        userId: new UniqueEntityId(data.userId),
        productId: new UniqueEntityId(data.productId),
        salePriceAtTime: Number(data.salePriceAtTime),
        quantity: data.quantity,
        soldAt: data.soldAt,
        updatedAt: data?.updatedAt ? data.updatedAt : undefined,
      },
      new UniqueEntityId(data.id)
    );
  }

  static toModel(saleProduct: SaleProduct): PrismaSaleProduct {
    return {
      id: saleProduct.id.toString(),
      userId: saleProduct.userId.toString(),
      productId: saleProduct.productId.toString(),
      salePriceAtTime: new Prisma.Decimal(saleProduct.salePriceAtTime),
      quantity: saleProduct.quantity,
      soldAt: saleProduct.soldAt,
      updatedAt: saleProduct.updatedAt ?? null,
    };
  }
}
