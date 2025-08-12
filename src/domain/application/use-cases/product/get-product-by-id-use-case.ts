import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { CategoryRepository } from '../../repositories/category-repository';
import type { ProductRepository } from '../../repositories/product-repository';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  userId: string;
  productId: string;
}

interface OutputDto {
  id: string;
  name: string;
  categoryName: string | null;
  createdAt: Date;
  salePrice: number;
  quantity: number;
}

export class GetProductByIdUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute({ productId, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const product = await this.productRepository.findById(
      new UniqueEntityId(productId),
      user.id
    );

    if (!product) {
      throw new ResourceNotFoundError();
    }

    let categoryName: string | null = null;

    if (product.categoryId) {
      const category = await this.categoryRepository.findById(
        new UniqueEntityId(product.categoryId),
        user.id
      );

      if (category) {
        categoryName = category.name;
      }
    }

    const productDto: OutputDto = {
      id: product.id.toString(),
      name: product.name,
      categoryName,
      salePrice: product.salePrice,
      quantity: product.quantity,
      createdAt: product.createdAt,
    };

    return {
      ...productDto,
    };
  }
}
