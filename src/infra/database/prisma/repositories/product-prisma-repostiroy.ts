import type { ProductRepository } from '@/domain/application/repositories/product-repository';
import type { Product } from '@/domain/enterprise/entities/product';
import { prisma } from '@/lib/prisma-client';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import type {
  OrderBy,
  OrderDirection,
  Pagination,
} from '@/shared/types/pagination';
import { ProductPrismaMapper } from '../mappers/product-prisma-mapper';

export class ProductPrismaRepository implements ProductRepository {
  async create(product: Product): Promise<void> {
    const data = ProductPrismaMapper.toModel(product);
    await prisma.product.create({
      data,
    });
  }

  async findById(
    id: UniqueEntityId,
    userId: UniqueEntityId
  ): Promise<Product | null> {
    const data = await prisma.product.findFirst({
      where: {
        id: id.toString(),
        AND: {
          userId: userId.toString(),
        },
      },
    });

    if (!data) {
      return null;
    }

    const product = ProductPrismaMapper.toDomain(data);
    return product;
  }

  async findMany(
    pagination: Pagination,
    userId: UniqueEntityId,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection
  ): Promise<Product[]> {
    const fieldOrderBy: OrderBy = orderBy ?? 'name';
    const fieldOrderDirection: OrderDirection = orderDirection ?? 'asc';

    const prismaOrderByFieldMap: Record<OrderBy, string> = {
      name: 'name',
      date: 'createdAt',
      salePrice: 'salePrice',
      quantity: 'quantity',
    };

    const orderField = prismaOrderByFieldMap[fieldOrderBy];

    const products = await prisma.product.findMany({
      where: {
        userId: userId.toString(),
      },
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: {
        [orderField]: fieldOrderDirection,
      },
    });

    return products.map(ProductPrismaMapper.toDomain);
  }

  async count(): Promise<number> {
    return await prisma.product.count();
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await prisma.product.delete({
      where: {
        id: id.toString(),
      },
    });
  }

  async update(product: Product): Promise<void> {
    const data = ProductPrismaMapper.toModel(product);
    await prisma.product.update({
      where: {
        id: product.id.toString(),
      },
      data,
    });
  }
}
