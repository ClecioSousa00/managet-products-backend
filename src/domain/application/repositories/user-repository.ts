import { User } from '@/domain/enterprise/entities/user'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export interface UserRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: UniqueEntityId): Promise<User | null>
}
