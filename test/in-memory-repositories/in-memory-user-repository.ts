import { UserRepository } from '@/domain/application/repositories/user.repository'
import { User } from '@/domain/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  items: User[] = []

  async create(user: User) {
    this.items.push(user)
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return user ?? null
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)

    return user ?? null
  }
}
