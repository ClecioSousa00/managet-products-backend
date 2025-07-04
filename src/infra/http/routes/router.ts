import { Router } from 'express'

import { ensureAuthenticated } from '../middleware/ensure-authenticated'

import { ExpressAdapter } from '../adapters/express-adapter'

import { makeAuthenticateUserController } from '../factories/controllers/make-authenticate-user.controller'
import { makeRegisterUserController } from '../factories/controllers/make-register-user-controller'
import { makeCreateCategoryController } from '../factories/controllers/make-create-category-controller'
import { makeGetProfileUserController } from '../factories/controllers/make-get-profile-user-controller'
import { makeGetAllCategoriesController } from '../factories/controllers/make-get-all-categories-controller'
import { makeDeleteCategoryController } from '../factories/controllers/make-delete-category-controller'
import { makeGetByIdCategoryController } from '../factories/controllers/make-get-by-id-category-controller'
import { makeCreateProductController } from '../factories/controllers/make-create-product-controller'
import { makeUpdateCategoryController } from '../factories/controllers/make-update-category-controller'

import { registerValidationUser } from '@/infra/controllers/user/register-user-controller'
import { authenticateValidationUser } from '@/infra/controllers/user/authenticate-user-controller'
import { deleteCategoryValidation } from '@/infra/controllers/category/delete-category-controller'
import { createCategoryValidation } from '@/infra/controllers/category/create-category-controller'
import {
  updateCategoryBodyValidation,
  updateCategoryParamsValidation,
} from '@/infra/controllers/category/update-category-controller'
import { GetByIdCategoryValidation } from '@/infra/controllers/category/get-by-id-category-controller'
import { CreateProductBodyValidation } from '@/infra/controllers/product/create-product-controller'
import { getAllProductsQueryValidation } from '@/infra/controllers/product/get-all-products-controller'
import { makeGetAllProductsController } from '../factories/controllers/make-get-all-products-controller'
import { getProductByIdValidation } from '@/infra/controllers/product/get-product-by-id-controller'
import { makeGetProductByIdController } from '../factories/controllers/make-get-by-id-products-controller'

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

routes.get(
  '/category/:id',
  ensureAuthenticated,
  GetByIdCategoryValidation,
  ExpressAdapter(makeGetByIdCategoryController()),
)

routes.delete(
  '/category/:id',
  ensureAuthenticated,
  deleteCategoryValidation,
  ExpressAdapter(makeDeleteCategoryController()),
)
routes.put(
  '/category/:id',
  ensureAuthenticated,
  updateCategoryParamsValidation,
  updateCategoryBodyValidation,
  ExpressAdapter(makeUpdateCategoryController()),
)

routes.post(
  '/product',
  ensureAuthenticated,
  CreateProductBodyValidation,
  ExpressAdapter(makeCreateProductController()),
)

routes.get(
  '/product',
  ensureAuthenticated,
  getAllProductsQueryValidation,
  ExpressAdapter(makeGetAllProductsController()),
)

routes.get(
  '/product/:id',
  ensureAuthenticated,
  getProductByIdValidation,
  ExpressAdapter(makeGetProductByIdController()),
)

export { routes }
