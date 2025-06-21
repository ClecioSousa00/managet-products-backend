import { Router } from 'express'

import { UserController } from '../controllers/user'

const routes = Router()

routes.post(
  '/register',
  UserController.registerValidation,
  UserController.RegisterUserController,
)

export { routes }
