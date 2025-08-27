import type { SaleProductRepository } from '@/domain/application/repositories/sale-product-repository';
import type { SaleProduct } from '@/domain/enterprise/entities/sale-product';
import { prisma } from '@/lib/prisma-client';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { SaleProductPrismaMapper } from '../mappers/sale-product-prisma-mapper';

export class SaleProductPrismaRepository implements SaleProductRepository {
  async create(saleProduct: SaleProduct): Promise<void> {
    const data = SaleProductPrismaMapper.toModel(saleProduct);
    await prisma.saleProduct.create({
      data,
    });
  }

  async findById(
    id: UniqueEntityId,
    userId: UniqueEntityId
  ): Promise<SaleProduct | null> {
    const saleProduct = await prisma.saleProduct.findUnique({
      where: {
        id: id.toString(),
        AND: {
          userId: userId.toString(),
        },
      },
    });

    if (!saleProduct) {
      return null;
    }

    return SaleProductPrismaMapper.toDomain(saleProduct);
  }

  async update(saleProduct: SaleProduct): Promise<void> {
    const data = SaleProductPrismaMapper.toModel(saleProduct);

    await prisma.saleProduct.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await prisma.saleProduct.delete({
      where: {
        id: id.toString(),
      },
    });
  }

  async count(userId: UniqueEntityId): Promise<number> {
    return await prisma.saleProduct.count({
      where: {
        userId: userId.toString(),
      },
    });
  }
}
