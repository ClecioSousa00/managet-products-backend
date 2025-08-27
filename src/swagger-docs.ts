import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { z } from 'zod';
import { CreateCategoryBodySchema } from './infra/http/schema-validations/categories/create-category-validation';
import { DeleteCategoryParamsSchema } from './infra/http/schema-validations/categories/delete-category-validation';
import { CategoryParamsSchema } from './infra/http/schema-validations/categories/get-category-by-id-validation';
import {
  UpdateCategoryBodySchema,
  UpdateCategoryParamsSchema,
} from './infra/http/schema-validations/categories/update-category-validation';
import { CreateProductBodySchema } from './infra/http/schema-validations/products/create-produtc-validation';
import { DeleteProductParamsSchema } from './infra/http/schema-validations/products/delete-product-validation';
import { GetAllProductsQuerySchema } from './infra/http/schema-validations/products/get-all-products-validation';
import { GetProductParamsSchema } from './infra/http/schema-validations/products/get-product-by-id-validation';
import {
  UpdateProductBodySchema,
  UpdateProductParamsSchema,
} from './infra/http/schema-validations/products/update-product-validation';
import { CreateSaleProductBodySchema } from './infra/http/schema-validations/sale-products/create-sale-product-validation';
import { DeleteSaleProductParamsSchema } from './infra/http/schema-validations/sale-products/delete-sale-product-by-id-validation';
import { GetSaleProductParamsSchema } from './infra/http/schema-validations/sale-products/get-sale-product-by-id-validation';
import {
  UpdateSaleProductBodySchema,
  UpdateSaleProductParamsSchema,
} from './infra/http/schema-validations/sale-products/update-sale-product-validation';
import { AuthenticateUserBodySchema } from './infra/http/schema-validations/user/authenticate-validation';
import { RegisterUserBodySchema } from './infra/http/schema-validations/user/register-validation';

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: 'post',
  path: '/users',
  summary: 'Create User',
  tags: ['Users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterUserBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Creates a new user account',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/users/me',
  summary: 'Get User Profile',
  tags: ['Users'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Successful response with user profile',
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            username: z.string(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  summary: 'Authenticate User',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: AuthenticateUserBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Authenticates user credentials and returns an access token',
      content: {
        'application/json': {
          schema: z.object({
            accessToken: z.string(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/categories',
  summary: 'Create Category',
  tags: ['Categories'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateCategoryBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Creates a new product category',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/categories/{id}',
  summary: 'Get Category by ID',
  tags: ['Categories'],
  security: [{ bearerAuth: [] }],
  request: {
    params: CategoryParamsSchema,
  },
  responses: {
    200: {
      description: 'Returns details of a specific category by its ID',
      content: {
        'application/json': {
          schema: z.object({
            id: z.string().uuid(),
            name: z.string(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/categories',
  summary: 'Get all Categories',
  tags: ['Categories'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Returns details of all categories',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
            })
          ),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/categories/{id}',
  summary: 'Delete Category by ID',
  tags: ['Categories'],
  security: [{ bearerAuth: [] }],
  request: {
    params: DeleteCategoryParamsSchema,
  },
  responses: {
    204: {
      description: 'Successful response with delete a category',
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/categories/{id}',
  summary: 'Update Category',
  tags: ['Categories'],
  security: [{ bearerAuth: [] }],
  request: {
    params: UpdateCategoryParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateCategoryBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful response with updated a category',
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/products',
  summary: 'Create Product',
  tags: ['Products'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateProductBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Creates a new product',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/products/{id}',
  summary: 'Get Product by ID',
  tags: ['Products'],
  security: [{ bearerAuth: [] }],
  request: {
    params: GetProductParamsSchema,
  },
  responses: {
    200: {
      description: 'Returns details of a specific product by its ID',
      content: {
        'application/json': {
          schema: z.object({
            id: z.string().uuid(),
            name: z.string(),
            categoryName: z.string(),
            salePrice: z.number(),
            quantity: z.number(),
            createdAt: z.string().datetime(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/products',
  summary: 'Get all User Products',
  tags: ['Products'],
  security: [{ bearerAuth: [] }],
  request: {
    query: GetAllProductsQuerySchema,
  },
  responses: {
    200: {
      description: 'Returns details of all products',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              categoryName: z.string(),
              salePrice: z.number(),
              quantity: z.number(),
              createdAt: z.string().datetime(),
            })
          ),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/products/{id}',
  summary: 'Update Product',
  tags: ['Products'],
  security: [{ bearerAuth: [] }],
  request: {
    params: UpdateProductParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateProductBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful response with updated a product',
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/products/{id}',
  summary: 'Delete Product',
  tags: ['Products'],
  security: [{ bearerAuth: [] }],
  request: {
    params: DeleteProductParamsSchema,
  },
  responses: {
    204: {
      description: 'Successful response with delete a product',
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/sale-products',
  summary: 'Create Sale Product',
  tags: ['Sale Products'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateSaleProductBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Creates a new sale product',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/sale-products/{id}',
  summary: 'Get Sale Product by ID',
  tags: ['Sale Products'],
  security: [{ bearerAuth: [] }],
  request: {
    params: GetSaleProductParamsSchema,
  },
  responses: {
    200: {
      description: 'Returns details of a specific sale product by its ID',
      content: {
        'application/json': {
          schema: z.object({
            productId: z.string().uuid(),
            nameProduct: z.string(),
            quantity: z.number(),
            salePriceAtTime: z.number(),
            soldAt: z.string().datetime(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/sale-products/{id}',
  summary: 'Update a Sale Product',
  tags: ['Sale Products'],
  security: [{ bearerAuth: [] }],
  request: {
    params: UpdateSaleProductParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateSaleProductBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful response with updated a sale product',
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/sale-products/{id}',
  summary: 'Delete a Sale Product',
  tags: ['Sale Products'],
  security: [{ bearerAuth: [] }],
  request: {
    params: DeleteSaleProductParamsSchema,
  },
  responses: {
    204: {
      description: 'Successful response with delete a sale product',
    },
  },
});

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

export { registry };
