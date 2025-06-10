import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CategoryProps {
  category: string
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(props: CategoryProps, id?: UniqueEntityId) {
    const category = new Category(
      {
        category: props.category,
      },
      id,
    )
    return category
  }
}
