import { Product } from '@/domain/enterprise/entities/Product'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { Prisma, Product as PrismaProduct } from '@prisma/client'

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
      },
      new UniqueEntityId(data.id),
    )
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
    }
  }
}
