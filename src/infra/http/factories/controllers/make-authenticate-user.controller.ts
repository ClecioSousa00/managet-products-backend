import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'
import { JWTService } from '@/infra/auth/jwt'
import { AuthenticateUserController } from '@/infra/controllers/user/authenticate-user-controller'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'

export const makeAuthenticateUserController = () => {
  const userRepository = new UserPrismaRepository()
  const jwtService = new JWTService()

  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
    jwtService,
  )

  return authenticateUserController
}
