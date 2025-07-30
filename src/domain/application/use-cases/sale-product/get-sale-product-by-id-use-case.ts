import { UseCase } from '@/shared/use-case'
import { UserRepository } from '../../repositories/user-repository'
import { SaleProductRepository } from '../../repositories/sale-product-repository'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { ProductRepository } from '../../repositories/product-repository'

interface InputDto {
  saleProductId: string
  userId: string
}

interface OutputDto {
  productId: string
  quantity: number
  salePriceAtTime: number
  soldAt: Date
  nameProduct: string
}

export class GetSaleProductByIdUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private userRepository: UserRepository,
    private saleProductRepository: SaleProductRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute({ saleProductId, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const saleProduct = await this.saleProductRepository.findById(
      new UniqueEntityId(saleProductId),
      user.id,
    )

    if (!saleProduct) {
      throw new ResourceNotFoundError()
    }

    const product = await this.productRepository.findById(
      saleProduct.productId,
      user.id,
    )

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return {
      productId: saleProduct.productId.toString(),
      quantity: saleProduct.quantity,
      salePriceAtTime: saleProduct.salePriceAtTime,
      soldAt: saleProduct.soldAt,
      nameProduct: product.name,
    }
  }
}
