import type { SaleProductQueryService } from '@/domain/application/use-cases/sale-product/queries/sale-product-query-service';
import { prisma } from '@/lib/prisma-client';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import type { Pagination } from '@/shared/paginator';
import type { OrderBy, OrderDirection } from '@/shared/types/search-params';

export class SaleProductsPrismaQueryService implements SaleProductQueryService {
  async findManyWithProductInfos(
    pagination: Pagination,
    userId: UniqueEntityId,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection
  ) {
    const fieldOrderBy: OrderBy = orderBy ?? 'name';
    const fieldOrderDirection: OrderDirection = orderDirection ?? 'asc';

    const prismaOrderByFieldMap: Record<OrderBy, string> = {
      name: 'name',
      date: 'createdAt',
      salePrice: 'salePrice',
      quantity: 'quantity',
    };

    const orderField = prismaOrderByFieldMap[fieldOrderBy];

    const saleProducts = await prisma.saleProduct.findMany({
      where: {
        userId: userId.toString(),
      },
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: {
        product: {
          [orderField]: fieldOrderDirection,
        },
      },
      include: {
        product: true,
      },
    });

    const saleProductsDto = saleProducts.map((saleProduct) => ({
      id: saleProduct.id,
      quantity: saleProduct.quantity,
      salePriceAtTime: Number(saleProduct.salePriceAtTime),
      soldAt: saleProduct.soldAt,
      product: {
        id: saleProduct.product.id,
        name: saleProduct.product.name,
      },
    }));
    return saleProductsDto;
  }
}
