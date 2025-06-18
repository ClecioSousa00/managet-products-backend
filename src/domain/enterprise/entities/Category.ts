import { Entity } from '@/shared/entities/entity'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { InvalidNameError } from '@/shared/errors/invalid-name-error'

export interface CategoryProps {
  name: string
  userId: UniqueEntityId
}

export class Category extends Entity<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(props: CategoryProps, id?: UniqueEntityId) {
    const category = new Category(
      { name: props.name.trim(), userId: props.userId },
      id,
    )
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
    this.props.name = newName.trim()
  }

  get name() {
    return this.props.name
  }

  get userId() {
    return this.props.userId
  }

  toJson() {
    return {
      id: this.id.toString(),
      ...this.props,
      userId: this.props.userId.toString(),
    }
  }
}
