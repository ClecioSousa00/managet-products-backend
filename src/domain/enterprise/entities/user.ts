import { Entity } from '@/core/entities/entity'
import { Email } from '../value-objects/Email'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export type UserProps = {
  email: Email
  username: string
  password: string
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityId) {
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
