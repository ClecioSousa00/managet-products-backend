import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { OrderBy, OrderDirection } from '@/shared/types/pagination';
import type { UseCase } from '@/shared/use-case';
import type { SaleProductQueryService } from '../../queries/sale-product-query-service';
import type { UserRepository } from '../../repositories/user-repository';

type InputDto = {
  userId: string;
  page: number;
  limit: number;
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
};

type OutputDto = {
  id: string;
  quantity: number;
  salePriceAtTime: number;
  soldAt: Date;
  product: {
    id: string;
    name: string;
  };
};

export class GetAllSaleProductUseCase
  implements UseCase<InputDto, OutputDto[]>
{
  constructor(
    private userRepository: UserRepository,
    private saleProductQueryService: SaleProductQueryService
  ) {}

  async execute({
    limit,
    page,
    userId,
    orderBy,
    orderDirection,
  }: InputDto): Promise<OutputDto[]> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const offset = (page - 1) * limit;
    const orderField: OrderBy = orderBy ?? 'name';
    const orderDir: OrderDirection = orderDirection ?? 'asc';

    const saleProducts =
      await this.saleProductQueryService.findManyWithProductInfos(
        { limit, offset },
        user.id,
        orderField,
        orderDir
      );

    return saleProducts;
  }
}
