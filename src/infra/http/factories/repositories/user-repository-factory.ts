import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'

const userRepository = new UserPrismaRepository()

export const makeUserRepository = () => {
  return userRepository
}
