import { Entity } from '@/shared/entities/entity'
import { Email } from '../value-objects/Email'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export type UserProps = {
  email: Email
  username: string
  password: string
}

const MIN_LENGTH_USERNAME = 3

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id)
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    if (!props.username || props.username.trim().length < MIN_LENGTH_USERNAME) {
      throw new Error('Invalid username.')
    }
    const user = new User(props, id)
    return user
  }

  get email() {
    return this.props.email.toValue()
  }

  get password() {
    return this.props.password
  }

  get username() {
    return this.props.username
  }
}
