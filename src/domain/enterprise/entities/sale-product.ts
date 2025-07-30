import { Entity } from '@/shared/entities/entity'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { InvalidPriceError } from '@/shared/errors/invalid-price-error'
import { Optional } from '@/shared/types/optional'

type SaleProductProps = {
  productId: UniqueEntityId
  quantity: number
  salePriceAtTime: number
  soldAt: Date
  userId: UniqueEntityId
  updatedAt?: Date
}
const MIN_QUANTITY = 0

export class SaleProduct extends Entity<SaleProductProps> {
  private constructor(props: SaleProductProps, id?: UniqueEntityId) {
    super(props, id)
    this.validate()
  }

  static create(
    props: Optional<SaleProductProps, 'soldAt'>,
    id?: UniqueEntityId,
  ) {
    const saleProduct = new SaleProduct(
      { ...props, soldAt: props.soldAt ?? new Date() },
      id,
    )
    return saleProduct
  }

  private validate() {
    if (this.props.quantity < MIN_QUANTITY) {
      throw new Error(`quantity cannot be less than ${MIN_QUANTITY}`)
    }

    if (this.props.salePriceAtTime < 0) {
      throw new InvalidPriceError()
    }
  }

  changeQuantity(quantity: number) {
    if (quantity < MIN_QUANTITY) {
      throw new Error(`quantity cannot be less than ${MIN_QUANTITY}`)
    }

    this.props.quantity = quantity
    this.markAsUpdated()
  }

  changeSalePrice(salePrice: number) {
    if (salePrice < 0) {
      throw new InvalidPriceError()
    }

    this.props.salePriceAtTime = salePrice
    this.markAsUpdated()
  }

  markAsUpdated() {
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.id.toString(),
      ...this.props,
      userId: this.props.userId.toString(),
    }
  }

  get quantity() {
    return this.props.quantity
  }

  get salePriceAtTime() {
    return this.props.salePriceAtTime
  }

  get userId() {
    return this.props.userId.toString()
  }

  get productId() {
    return this.props.productId.toString()
  }
}
