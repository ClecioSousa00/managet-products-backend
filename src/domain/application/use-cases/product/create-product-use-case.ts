import { UseCase } from '@/shared/use-case'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { Product } from '@/domain/enterprise/entities/Product'

import { ProductRepository } from '../../repositories/product-repository'
import { UserRepository } from '../../repositories/user-repository'

import { CategoryRepository } from '../../repositories/category-repository'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'

interface InputDto {
  categoryId: string
  name: string
  quantity: number
  salePrice: number
  purchasePrice: number
  userId: string
}

interface OutputDto {}

export class CreateProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(input: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(
      new UniqueEntityId(input.userId),
    )

    if (!user) {
      throw new UserNotFoundError()
    }

    const isCategoryExists = await this.categoryRepository.findById(
      new UniqueEntityId(input.categoryId),
    )

    if (!isCategoryExists) {
      throw new CategoryNotFoundError()
    }

    const product = Product.create({
      categoryId: input.categoryId,
      name: input.name,
      purchasePrice: input.purchasePrice,
      quantity: input.quantity,
      salePrice: input.salePrice,
      userId: new UniqueEntityId(input.userId),
    })

    await this.productRepository.create(product)

    return {}
  }
}
