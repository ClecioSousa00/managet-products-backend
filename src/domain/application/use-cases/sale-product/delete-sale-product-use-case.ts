import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { ProductRepository } from '../../repositories/product-repository';
import type { SaleProductRepository } from '../../repositories/sale-product-repository';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  userId: string;
  saleProductId: string;
}

type OutputDto = {};

export class DeleteSaleProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private userRepository: UserRepository,
    private saleProductRepository: SaleProductRepository,
    private productRepository: ProductRepository
  ) {}
  async execute({ saleProductId, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const saleProduct = await this.saleProductRepository.findById(
      new UniqueEntityId(saleProductId),
      user.id
    );

    if (!saleProduct) {
      throw new ResourceNotFoundError();
    }

    const product = await this.productRepository.findById(
      saleProduct.productId,
      user.id
    );

    if (!product) {
      throw new ResourceNotFoundError();
    }

    const newQuantityProduct = product.quantity + saleProduct.quantity;

    product.changeQuantity(newQuantityProduct);

    await this.saleProductRepository.delete(saleProduct.id);
    await this.productRepository.update(product);
    return {};
  }
}
