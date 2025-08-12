import { SaleProduct } from '@/domain/enterprise/entities/sale-product';
import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { InsufficientStockError } from '@/shared/errors/InsufficientStockError';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { ProductRepository } from '../../repositories/product-repository';
import type { SaleProductRepository } from '../../repositories/sale-product-repository';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  productId: string;
  userId: string;
  quantity: number;
  salePriceAtTime: number;
}

type OutputDto = {};

export class CreateSaleProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private saleProductRepository: SaleProductRepository
  ) {}

  async execute({
    productId,
    quantity,
    salePriceAtTime,
    userId,
  }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const product = await this.productRepository.findById(
      new UniqueEntityId(productId),
      new UniqueEntityId(userId)
    );

    if (!product) {
      throw new ResourceNotFoundError();
    }

    const isValidQuantity = product.quantity > quantity;

    if (!isValidQuantity) {
      throw new InsufficientStockError();
    }

    const newProductQuantity = product.quantity - quantity;
    product.changeQuantity(newProductQuantity);

    const saleProduct = SaleProduct.create({
      productId: new UniqueEntityId(productId),
      quantity,
      salePriceAtTime,
      userId: new UniqueEntityId(userId),
    });

    await this.saleProductRepository.create(saleProduct);

    await this.productRepository.update(product);

    return {};
  }
}
