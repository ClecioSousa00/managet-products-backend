import { Router } from 'express'

import { ensureAuthenticated } from '../middleware/ensure-authenticated'
import { UserController } from '@/infra/controllers/user'
import { CategoryController } from '@/infra/controllers/category'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'
import { RegisterUserController } from '@/infra/controllers/user/register-user-controller'
import { ExpressAdapter } from '../adapters/express-adapter'
import { registerValidationUser } from '../validation/register-validation-user'

const routes = Router()

const userRepository = new UserPrismaRepository()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
const registerUserController = new RegisterUserController(registerUserUseCase)

routes.post(
  '/register',
  registerValidationUser,
  ExpressAdapter(registerUserController),
)
routes.post(
  '/authenticate',
  UserController.authenticateValidation,
  UserController.AuthenticateUser,
)

routes.post(
  '/category/create',
  ensureAuthenticated,
  CategoryController.CreateCategory,
)

export { routes }
