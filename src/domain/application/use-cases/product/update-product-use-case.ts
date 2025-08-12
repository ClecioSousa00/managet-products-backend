import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { CategoryRepository } from '../../repositories/category-repository';
import type { ProductRepository } from '../../repositories/product-repository';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  id: string;
  userId: string;
  categoryId?: string;
  name?: string;
  quantity?: number;
  salePrice?: number;
  purchasePrice?: number;
}

type OutputDto = {};

export class UpdateProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(input: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(
      new UniqueEntityId(input.userId)
    );

    if (!user) {
      throw new UserNotFoundError();
    }
    const product = await this.productRepository.findById(
      new UniqueEntityId(input.id),
      user.id
    );

    if (!product) {
      throw new ResourceNotFoundError();
    }

    if (input.name) {
      product.updateName(input.name);
    }

    if (input.quantity && input.quantity >= 0) {
      product.changeQuantity(input.quantity);
    }

    if (input.salePrice) {
      product.changeSalePrice(input.salePrice);
    }

    if (input.purchasePrice) {
      product.changePurchasePrice(input.purchasePrice);
    }

    if (input.categoryId) {
      const category = await this.categoryRepository.findById(
        new UniqueEntityId(input.categoryId),
        user.id
      );

      if (!category) {
        throw new CategoryNotFoundError();
      }
      product.reclassifyCategory(category.id);
    }

    await this.productRepository.update(product);

    return {};
  }
}
