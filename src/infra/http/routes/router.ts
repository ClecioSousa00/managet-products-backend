import { Router } from 'express'

import { ensureAuthenticated } from '../middleware/ensure-authenticated'

import { ExpressAdapter } from '../adapters/express-adapter'

import { makeAuthenticateUserController } from '../factories/controllers/make-authenticate-user.controller'
import { makeRegisterUserController } from '../factories/controllers/make-register-user-controller'
import { makeCreateCategoryController } from '../factories/controllers/make-create-category-controller'

import { createCategoryValidation } from '../validation/categories/create-category-validation'
import { registerValidationUser } from '../validation/users/register-validation-user'
import { authenticateValidationUser } from '../validation/users/authenticate-validation-user'

const routes = Router()

routes.post(
  '/users',
  registerValidationUser,
  ExpressAdapter(makeRegisterUserController()),
)
routes.post(
  '/authenticate',
  authenticateValidationUser,
  ExpressAdapter(makeAuthenticateUserController()),
)

routes.post(
  '/category',
  ensureAuthenticated,
  createCategoryValidation,
  ExpressAdapter(makeCreateCategoryController()),
)

export { routes }
