import { UseCase } from '@/shared/use-case'

import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

import { ProductRepository } from '../../repositories/product-repository'
import { UserRepository } from '../../repositories/user-repository'
import { CategoryRepository } from '../../repositories/category-repository'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'

interface InputDto {
  userId: string
  productId: string
}

interface OutputDto {
  id: string
  name: string
  categoryName: string
  createdAt: Date
  salePrice: number
  quantity: number
}

export class GetProductByIdUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({ productId, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const product = await this.productRepository.findById(
      new UniqueEntityId(productId),
      user.id,
    )

    if (!product) {
      throw new ResourceNotFoundError()
    }

    const category = await this.categoryRepository.findById(
      new UniqueEntityId(product.categoryId),
      user.id,
    )

    if (!category) {
      throw new CategoryNotFoundError()
    }

    const productDto: OutputDto = {
      id: product.id.toString(),
      name: product.name,
      categoryName: category.name,
      salePrice: product.salePrice,
      quantity: product.quantity,
      createdAt: product.createdAt,
    }

    return {
      ...productDto,
    }
  }
}
