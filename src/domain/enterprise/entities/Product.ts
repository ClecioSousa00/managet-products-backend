import { Entity } from '@/shared/entities/entity'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { Optional } from '@/shared/types/optional'

export interface ProductProps {
  name: string
  quantity: number
  salePrice: number
  purchasePrice: number
  categoryId: string
  createdAt: Date
  updatedAt?: Date
  userId: UniqueEntityId
}

const QUANTITY_CANNOT_BE_LESS_THAN = 1

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    if (!props.name || !props.name.trim().length) {
      throw new Error('Invalid product name.')
    }

    if (props.quantity < QUANTITY_CANNOT_BE_LESS_THAN) {
      throw new Error(
        `quantity cannot be less than ${QUANTITY_CANNOT_BE_LESS_THAN}`,
      )
    }

    if (props.salePrice < 0 || props.purchasePrice < 0) {
      throw new Error('Price cannot be negative')
    }

    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return product
  }

  get name() {
    return this.props.name
  }

  get quantity() {
    return this.props.quantity
  }

  get createdAt() {
    return this.props.createdAt
  }

  get categoryId() {
    return this.props.categoryId
  }

  get salePrice() {
    return this.props.salePrice
  }

  get userId() {
    return this.props.userId
  }
}
