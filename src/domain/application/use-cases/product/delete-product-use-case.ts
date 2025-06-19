import { UseCase } from '@/shared/use-case'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

import { UserRepository } from '../../repositories/user-repository'
import { ProductRepository } from '../../repositories/product-repository'

interface InputDto {
  userId: string
  productId: string
}

interface OutputDto {}

export class DeleteProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
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

    await this.productRepository.delete(product.id)

    return {}
  }
}
