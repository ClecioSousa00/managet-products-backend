import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { SaleProductQueryService } from '../../queries/sale-product-query-service';
import type { UserRepository } from '../../repositories/user-repository';

type InputDto = {
  userId: string;
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

  async execute({ userId }: InputDto): Promise<OutputDto[]> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const saleProducts =
      await this.saleProductQueryService.findManyWithProductInfos(user.id);

    return saleProducts;
  }
}
