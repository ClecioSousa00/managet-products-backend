import { Entity } from '@/shared/entities/entity'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { InvalidNameError } from '@/shared/errors/invalid-name-error'

export interface CategoryProps {
  name: string
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(props: CategoryProps, id?: UniqueEntityId) {
    const category = new Category({ name: props.name }, id)
    category.validateName(category.props.name)
    return category
  }

  private validateName(name: string) {
    if (!name || name.trim().length === 0) {
      throw new InvalidNameError()
    }
  }

  updateName(newName: string) {
    this.validateName(newName)
    this.props.name = newName
  }

  get name() {
    return this.props.name
  }
}
