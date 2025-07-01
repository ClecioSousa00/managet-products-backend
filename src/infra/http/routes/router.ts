import { Router } from 'express'

import { ensureAuthenticated } from '../middleware/ensure-authenticated'

import { ExpressAdapter } from '../adapters/express-adapter'

import { makeAuthenticateUserController } from '../factories/controllers/make-authenticate-user.controller'
import { makeRegisterUserController } from '../factories/controllers/make-register-user-controller'
import { makeCreateCategoryController } from '../factories/controllers/make-create-category-controller'
import { makeGetProfileUserController } from '../factories/controllers/make-get-profile-user-controller'
import { makeGetAllCategoriesController } from '../factories/controllers/make-get-all-categories-controller'
import { makeDeleteCategoryController } from '../factories/controllers/make-delete-category-controller'

import { registerValidationUser } from '@/infra/controllers/user/register-user-controller'
import { authenticateValidationUser } from '@/infra/controllers/user/authenticate-user-controller'
import { deleteCategoryValidation } from '@/infra/controllers/category/delete-category-controller'
import { createCategoryValidation } from '@/infra/controllers/category/create-category-controller'

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

routes.get(
  '/profile',
  ensureAuthenticated,
  ExpressAdapter(makeGetProfileUserController()),
)

routes.post(
  '/category',
  ensureAuthenticated,
  createCategoryValidation,
  ExpressAdapter(makeCreateCategoryController()),
)

routes.get(
  '/category',
  ensureAuthenticated,
  ExpressAdapter(makeGetAllCategoriesController()),
)

routes.delete(
  '/category/:id',
  ensureAuthenticated,
  deleteCategoryValidation,
  ExpressAdapter(makeDeleteCategoryController()),
)

export { routes }
