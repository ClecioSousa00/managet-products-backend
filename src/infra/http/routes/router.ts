import { Router } from 'express'

import { ensureAuthenticated } from '../middleware/ensure-authenticated'
import { CategoryController } from '@/infra/controllers/category'
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository'
import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case'
import { RegisterUserController } from '@/infra/controllers/user/register-user-controller'
import { ExpressAdapter } from '../adapters/express-adapter'
import { registerValidationUser } from '../validation/register-validation-user'
import { authenticateValidationUser } from '../validation/authenticate-validation-user'
import { makeAuthenticateUserController } from '../factories/controllers/make-authenticate-user.controller'

const routes = Router()

const userRepository = new UserPrismaRepository()

const registerUserUseCase = new RegisterUserUseCase(userRepository)
const registerUserController = new RegisterUserController(registerUserUseCase)

routes.post(
  '/users',
  registerValidationUser,
  ExpressAdapter(registerUserController),
)
routes.post(
  '/authenticate',
  authenticateValidationUser,
  ExpressAdapter(makeAuthenticateUserController()),
)

routes.post(
  '/category/create',
  ensureAuthenticated,
  CategoryController.CreateCategory,
)

export { routes }
