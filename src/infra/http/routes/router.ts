import { Router } from 'express'

import { UserController } from '../controllers/user'
import { CategoryController } from '../controllers/category'
import { ensureAuthenticated } from '../middleware/ensure-authenticated'

const routes = Router()

routes.post(
  '/register',
  UserController.registerValidation,
  UserController.RegisterUser,
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
