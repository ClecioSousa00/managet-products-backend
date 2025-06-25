import { Router } from 'express'

import { ensureAuthenticated } from '../middleware/ensure-authenticated'
import { CategoryController } from '@/infra/controllers/category'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'
import { RegisterUserController } from '@/infra/controllers/user/register-user-controller'
import { ExpressAdapter } from '../adapters/express-adapter'
import { registerValidationUser } from '../validation/register-validation-user'
import { authenticateValidationUser } from '../validation/authenticate-validation-user'
import { AuthenticateUserController } from '@/infra/controllers/user/authenticate-user-controller'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case'

const routes = Router()

const userRepository = new UserPrismaRepository()

const registerUserUseCase = new RegisterUserUseCase(userRepository)
const registerUserController = new RegisterUserController(registerUserUseCase)

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
)

routes.post(
  '/users',
  registerValidationUser,
  ExpressAdapter(registerUserController),
)
routes.post(
  '/authenticate',
  authenticateValidationUser,
  ExpressAdapter(authenticateUserController),
)

routes.post(
  '/category/create',
  ensureAuthenticated,
  CategoryController.CreateCategory,
)

export { routes }
