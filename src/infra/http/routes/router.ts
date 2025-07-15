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
import { makeGetAllProductsController } from '../factories/controllers/make-get-all-products-controller'
import { makeGetProductByIdController } from '../factories/controllers/make-get-by-id-products-controller'
import { makeDeleteProductController } from '../factories/controllers/make-delete-products-controller'

import { CreateProductBodyValidation } from '../schema-validations/products/create-produtc-validation'
import { getAllProductsQueryValidation } from '../schema-validations/products/get-all-products-validation'
import { getProductByIdValidation } from '../schema-validations/products/get-product-by-id-validation'
import { createCategoryValidation } from '../schema-validations/categories/create-category-validation'
import { deleteCategoryValidation } from '../schema-validations/categories/delete-category-validation'
import { GetByIdCategoryValidation } from '../schema-validations/categories/get-category-by-id-validation'
import {
  updateCategoryBodyValidation,
  updateCategoryParamsValidation,
} from '../schema-validations/categories/update-category-validation'
import { registerValidationUser } from '../schema-validations/user/register-validation'
import { authenticateValidationUser } from '../schema-validations/user/authenticate-validation'
import { deleteProductValidation } from '../schema-validations/products/delete-product-validation'
import {
  updateProductBodyValidation,
  updateProductParamsValidation,
} from '../schema-validations/products/update-product-validation'
import { makeUpdateProductController } from '../factories/controllers/make-update-product-controller'

const routes = Router()

routes.post(
  '/users',
  registerValidationUser,
  ExpressAdapter(makeRegisterUserController()),
)

routes.get(
  '/users/me',
  ensureAuthenticated,
  ExpressAdapter(makeGetProfileUserController()),
)

routes.post(
  '/auth/login',
  authenticateValidationUser,
  ExpressAdapter(makeAuthenticateUserController()),
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

routes.delete(
  '/product/:id',
  ensureAuthenticated,
  deleteProductValidation,
  ExpressAdapter(makeDeleteProductController()),
)

routes.put(
  '/product/:id',
  ensureAuthenticated,
  updateProductParamsValidation,
  updateProductBodyValidation,
  ExpressAdapter(makeUpdateProductController()),
)

export { routes }
