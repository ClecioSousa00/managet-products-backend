import { ProductRepository } from '@/domain/application/repositories/product-repository'
import { Product } from '@/domain/enterprise/entities/Product'
import { prisma } from '@/lib/prisma-client'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { Pagination, OrderBy, OrderDirection } from '@/shared/types/pagination'
import { ProductPrismaMapper } from '../mappers/product-prisma-mapper'

export class ProductPrismaRepository implements ProductRepository {
  async create(product: Product): Promise<void> {
    const data = ProductPrismaMapper.toModel(product)
    await prisma.product.create({
      data,
    })
  }

  async findById(
    id: UniqueEntityId,
    userId: UniqueEntityId,
  ): Promise<Product | null> {
    const data = await prisma.product.findFirst({
      where: {
        id: id.toString(),
        AND: {
          userId: userId.toString(),
        },
      },
    })

    if (!data) return null

    const product = ProductPrismaMapper.toDomain(data)
    return product
  }

  findMany(
    pagination: Pagination,
    userId: UniqueEntityId,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection,
  ): Promise<Product[]> {
    throw new Error('Method not implemented.')
  }

  count(): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await prisma.product.delete({
      where: {
        id: id.toString(),
      },
    })
  }

  update(product: Product): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
