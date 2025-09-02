import { Prisma, type Product as PrismaProduct } from '@prisma/client';
import { Product } from '@/domain/enterprise/entities/product';
import { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export class ProductPrismaMapper {
  static toDomain(data: PrismaProduct): Product {
    return Product.create(
      {
        categoryId: data.categoryId,
        userId: new UniqueEntityId(data.userId),
        name: data.name,
        purchasePrice: Number(data.purchasePrice),
        salePrice: Number(data.salePrice),
        quantity: data.quantity,
        createdAt: data.createdAt,
        updatedAt: data?.updatedAt ? data.updatedAt : undefined,
        imageBase64: data.imageBase64,
      },
      new UniqueEntityId(data.id)
    );
  }

  static toModel(product: Product): PrismaProduct {
    return {
      id: product.id.toString(),
      userId: product.userId.toString(),
      categoryId: product.categoryId,
      name: product.name,
      purchasePrice: new Prisma.Decimal(product.purchasePrice),
      salePrice: new Prisma.Decimal(product.salePrice),
      quantity: product.quantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? null,
      imageBase64: product.imageBase64 ?? null,
    };
  }
}
