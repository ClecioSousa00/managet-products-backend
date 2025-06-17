import { UseCase } from '@/shared/use-case'
import { UserRepository } from '../../repositories/user-repository'
import { ProductRepository } from '../../repositories/product-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

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
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const product = await this.productRepository.findById(
      new UniqueEntityId(productId),
    )

    if (!product) {
      throw new ResourceNotFoundError()
    }

    await this.productRepository.delete(product.userId, product.id)

    return {}
  }
}
