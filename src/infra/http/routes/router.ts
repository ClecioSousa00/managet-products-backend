import { Router } from 'express';
import { ExpressAdapter } from '../adapters/express-adapter';
import { makeAuthenticateUserController } from '../factories/controllers/make-authenticate-user.controller';
import { makeCreateCategoryController } from '../factories/controllers/make-create-category-controller';
import { makeCreateProductController } from '../factories/controllers/make-create-product-controller';
import { makeDeleteCategoryController } from '../factories/controllers/make-delete-category-controller';
import { makeDeleteProductController } from '../factories/controllers/make-delete-products-controller';
import { makeDeleteSaleProductController } from '../factories/controllers/make-delete-sale-product-by-id-controller';
import { makeGetAllCategoriesController } from '../factories/controllers/make-get-all-categories-controller';
import { makeGetAllProductsController } from '../factories/controllers/make-get-all-products-controller';
import { makeGetByIdCategoryController } from '../factories/controllers/make-get-by-id-category-controller';
import { makeGetProductByIdController } from '../factories/controllers/make-get-by-id-products-controller';
import { makeGetProfileUserController } from '../factories/controllers/make-get-profile-user-controller';
import { makeGetSaleProductByIdController } from '../factories/controllers/make-get-sale-product-by-id-controller';
import { makeRegisterUserController } from '../factories/controllers/make-register-user-controller';
import { makeCreateSaleProductController } from '../factories/controllers/make-sale-product-controller';
import { makeUpdateCategoryController } from '../factories/controllers/make-update-category-controller';
import { makeUpdateProductController } from '../factories/controllers/make-update-product-controller';
import { makeUpdateSaleProductController } from '../factories/controllers/make-update-sale-product-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { createCategoryValidation } from '../schema-validations/categories/create-category-validation';
import { deleteCategoryValidation } from '../schema-validations/categories/delete-category-validation';
import { GetByIdCategoryValidation } from '../schema-validations/categories/get-category-by-id-validation';
import {
  updateCategoryBodyValidation,
  updateCategoryParamsValidation,
} from '../schema-validations/categories/update-category-validation';
import { CreateProductBodyValidation } from '../schema-validations/products/create-produtc-validation';
import { deleteProductValidation } from '../schema-validations/products/delete-product-validation';
import { getAllProductsQueryValidation } from '../schema-validations/products/get-all-products-validation';
import { getProductByIdValidation } from '../schema-validations/products/get-product-by-id-validation';
import {
  updateProductBodyValidation,
  updateProductParamsValidation,
} from '../schema-validations/products/update-product-validation';
import { CreateSaleProductValidation } from '../schema-validations/sale-products/create-sale-product-validation';
import { deleteSaleProductValidation } from '../schema-validations/sale-products/delete-sale-product-by-id-validation';
import { getSaleProductByIdValidation } from '../schema-validations/sale-products/get-sale-product-by-id-validation';
import {
  updateSaleProductBodyValidation,
  updateSaleProductParamsValidation,
} from '../schema-validations/sale-products/update-sale-product-validation';
import { authenticateValidationUser } from '../schema-validations/user/authenticate-validation';
import { registerValidationUser } from '../schema-validations/user/register-validation';

const routes = Router();

routes.post(
  '/users',
  registerValidationUser,
  ExpressAdapter(makeRegisterUserController())
);

routes.get(
  '/users/me',
  ensureAuthenticated,
  ExpressAdapter(makeGetProfileUserController())
);

routes.post(
  '/auth/login',
  authenticateValidationUser,
  ExpressAdapter(makeAuthenticateUserController())
);

routes.post(
  '/categories',
  ensureAuthenticated,
  createCategoryValidation,
  ExpressAdapter(makeCreateCategoryController())
);

routes.get(
  '/categories',
  ensureAuthenticated,
  ExpressAdapter(makeGetAllCategoriesController())
);

routes.get(
  '/categories/:id',
  ensureAuthenticated,
  GetByIdCategoryValidation,
  ExpressAdapter(makeGetByIdCategoryController())
);

routes.delete(
  '/categories/:id',
  ensureAuthenticated,
  deleteCategoryValidation,
  ExpressAdapter(makeDeleteCategoryController())
);
routes.put(
  '/categories/:id',
  ensureAuthenticated,
  updateCategoryParamsValidation,
  updateCategoryBodyValidation,
  ExpressAdapter(makeUpdateCategoryController())
);

routes.post(
  '/products',
  ensureAuthenticated,
  CreateProductBodyValidation,
  ExpressAdapter(makeCreateProductController())
);

routes.get(
  '/products',
  ensureAuthenticated,
  getAllProductsQueryValidation,
  ExpressAdapter(makeGetAllProductsController())
);

routes.get(
  '/products/:id',
  ensureAuthenticated,
  getProductByIdValidation,
  ExpressAdapter(makeGetProductByIdController())
);

routes.delete(
  '/products/:id',
  ensureAuthenticated,
  deleteProductValidation,
  ExpressAdapter(makeDeleteProductController())
);

routes.put(
  '/products/:id',
  ensureAuthenticated,
  updateProductParamsValidation,
  updateProductBodyValidation,
  ExpressAdapter(makeUpdateProductController())
);

routes.post(
  '/sale-products',
  ensureAuthenticated,
  CreateSaleProductValidation,
  ExpressAdapter(makeCreateSaleProductController())
);

routes.get(
  '/sale-products/:id',
  ensureAuthenticated,
  getSaleProductByIdValidation,
  ExpressAdapter(makeGetSaleProductByIdController())
);

routes.put(
  '/sale-products/:id',
  ensureAuthenticated,
  updateSaleProductParamsValidation,
  updateSaleProductBodyValidation,
  ExpressAdapter(makeUpdateSaleProductController())
);

routes.delete(
  '/sale-products/:id',
  ensureAuthenticated,
  deleteSaleProductValidation,
  ExpressAdapter(makeDeleteSaleProductController())
);

export { routes };
