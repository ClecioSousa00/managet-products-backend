import { Router } from 'express'

import { UserController } from '../controllers/user'
import { CategoryController } from '../controllers/category'
import { validation } from '../middleware/validation'

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

routes.post('/category/create', validation, CategoryController.CreateCategory)

export { routes }
