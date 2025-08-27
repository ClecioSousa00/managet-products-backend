import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { type PaginationResult, Paginator } from '@/shared/paginator';
import type { OrderBy, OrderDirection } from '@/shared/types/search-params';
import type { UseCase } from '@/shared/use-case';
import type { SaleProductRepository } from '../../repositories/sale-product-repository';
import type { UserRepository } from '../../repositories/user-repository';
import type { SaleProductQueryService } from './queries/sale-product-query-service';

type SaleProductsProps = {
  id: string;
  quantity: number;
  salePriceAtTime: number;
  soldAt: Date;
  product: {
    id: string;
    name: string;
  };
};

type InputDto = {
  userId: string;
  page: number;
  limit: number;
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
};

interface OutputDto {
  saleProducts: SaleProductsProps[];
  pagination: PaginationResult;
}

export class GetAllSaleProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private userRepository: UserRepository,
    private saleProductQueryService: SaleProductQueryService,
    private saleProductRepository: SaleProductRepository
  ) {}

  async execute({
    limit,
    page,
    userId,
    orderBy,
    orderDirection,
  }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (typeof limit === 'string') {
      throw new Error('isso chegou como string como ??????????//');
    }

    if (!user) {
      throw new UserNotFoundError();
    }

    const offset = Paginator.getOffset(page, limit);

    const saleProducts =
      await this.saleProductQueryService.findManyWithProductInfos(
        { limit, offset },
        user.id,
        orderBy,
        orderDirection
      );

    const totalSaleProducts = await this.saleProductRepository.count(user.id);

    const pagination = Paginator.build(page, limit, totalSaleProducts);

    return {
      saleProducts,
      pagination,
    };
  }
}
