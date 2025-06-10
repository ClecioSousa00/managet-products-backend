import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

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

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
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
}
