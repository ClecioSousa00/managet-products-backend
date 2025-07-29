import { UseCase } from '@/shared/use-case'
import { UserRepository } from '../../repositories/user-repository'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { ProductRepository } from '../../repositories/product-repository'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { SaleProduct } from '@/domain/enterprise/entities/sale-product'
import { SaleProductRepository } from '../../repositories/sale-product-repository'
import { InsufficientStockError } from '@/shared/errors/InsufficientStockError'

interface InputDto {
  productId: string
  userId: string
  quantity: number
  salePriceAtTime: number
}

interface OutputDto {}

export class CreateSaleProductUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private userRepository: UserRepository,
    private productRepository: ProductRepository,
    private saleProductRepository: SaleProductRepository,
  ) {}

  async execute({
    productId,
    quantity,
    salePriceAtTime,
    userId,
  }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const product = await this.productRepository.findById(
      new UniqueEntityId(productId),
      new UniqueEntityId(userId),
    )

    if (!product) {
      throw new ResourceNotFoundError()
    }

    const isValidQuantity = product.quantity > quantity

    if (!isValidQuantity) {
      throw new InsufficientStockError()
    }

    const newProductQuantity = product.quantity - quantity
    product.changeQuantity(newProductQuantity)

    const saleProduct = SaleProduct.create({
      productId: new UniqueEntityId(productId),
      quantity,
      salePriceAtTime,
      userId: new UniqueEntityId(userId),
    })

    await this.saleProductRepository.create(saleProduct)

    await this.productRepository.update(product)

    return {}
  }
}
