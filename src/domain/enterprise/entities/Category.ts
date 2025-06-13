import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CategoryProps {
  name: string
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(props: CategoryProps, id?: UniqueEntityId) {
    if (!props.name || !props.name.trim().length) {
      throw new Error('Invalid category name.')
    }
    const category = new Category(
      {
        name: props.name,
      },
      id,
    )
    return category
  }

  get name() {
    return this.props.name
  }
}
