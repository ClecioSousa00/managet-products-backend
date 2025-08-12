import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import type {
  OrderBy,
  OrderDirection,
  Pagination,
} from '@/shared/types/pagination';

type SaleProductWithProductInfos = {
  id: string;
  quantity: number;
  salePriceAtTime: number;
  soldAt: Date;
  product: {
    id: string;
    name: string;
  };
};

export interface SaleProductQueryService {
  findManyWithProductInfos(
    pagination: Pagination,
    userId: UniqueEntityId,
    orderBy?: OrderBy,
    orderDirection?: OrderDirection
  ): Promise<SaleProductWithProductInfos[]>;
}
