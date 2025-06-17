import { UseCase } from '@/shared/use-case'
import { ProductRepository } from '../../repositories/product-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CategoryService } from '@/domain/enterprise/domain-services/category-service'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

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
    private categoryService: CategoryService,
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

    const categoryName = await this.categoryService.getCategoryNameById(
      product.categoryId,
    )

    const productDto: OutputDto = {
      id: product.id.toString(),
      name: product.name,
      categoryName,
      salePrice: product.salePrice,
      quantity: product.quantity,
      createdAt: product.createdAt,
    }

    return {
      ...productDto,
    }
  }
}
