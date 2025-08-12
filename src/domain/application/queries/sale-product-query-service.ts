import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';

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
    userId: UniqueEntityId
  ): Promise<SaleProductWithProductInfos[]>;
}
