import { UserRepository } from '@/domain/application/repositories/user-repository'
import { User } from '@/domain/enterprise/entities/user'
import { Email } from '@/domain/enterprise/value-objects/Email'
import { prisma } from '@/lib/prisma-client'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'

export class UserPrismaRepository implements UserRepository {
  async create(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        username: user.password,
        id: user.id.toString(),
      },
    })
  }

  async findByEmail(email: string) {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!data) return null

    const user = User.create(
      {
        email: new Email(data.email),
        password: data.password,
        username: data.password,
      },
      new UniqueEntityId(data.id),
    )

    return user
  }

  async findById(id: UniqueEntityId) {
    const data = await prisma.user.findUnique({
      where: {
        id: id.toString(),
      },
    })

    if (!data) return null

    const user = User.create(
      {
        email: new Email(data.email),
        password: data.password,
        username: data.username,
      },
      new UniqueEntityId(data.id),
    )
    return user
  }
}
