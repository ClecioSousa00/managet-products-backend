import type { UserRepository } from '@/domain/application/repositories/user-repository';
import type { User } from '@/domain/enterprise/entities/user';
import type { UniqueEntityId } from '@/shared/entities/unique-entity-id';

export class InMemoryUserRepository implements UserRepository {
  items: User[] = [];

  async create(user: User) {
    this.items.push(user);
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    return user ?? null;
  }

  async findById(id: UniqueEntityId): Promise<User | null> {
    const user = this.items.find((item) => item.id.equals(id));

    return user ?? null;
  }
}
