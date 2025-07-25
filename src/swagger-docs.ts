import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { z } from 'zod'

import { RegisterUserBodySchema } from './infra/http/schema-validations/user/register-validation'
import { AuthenticateUserBodySchema } from './infra/http/schema-validations/user/authenticate-validation'
import { CreateCategoryBodySchema } from './infra/http/schema-validations/categories/create-category-validation'
import { CategoryParamsSchema } from './infra/http/schema-validations/categories/get-category-by-id-validation'
import { DeleteCategoryParamsSchema } from './infra/http/schema-validations/categories/delete-category-validation'
import {
  UpdateCategoryBodySchema,
  UpdateCategoryParamsSchema,
} from './infra/http/schema-validations/categories/update-category-validation'
import { CreateProductBodySchema } from './infra/http/schema-validations/products/create-produtc-validation'
import { GetProductParamsSchema } from './infra/http/schema-validations/products/get-product-by-id-validation'
import {
  UpdateProductBodySchema,
  UpdateProductParamsSchema,
} from './infra/http/schema-validations/products/update-product-validation'
import { DeleteProductParamsSchema } from './infra/http/schema-validations/products/delete-product-validation'
import { GetAllProductsQuerySchema } from './infra/http/schema-validations/products/get-all-products-validation'

const registry = new OpenAPIRegistry()

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
})

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
})

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
})

registry.registerPath({
  method: 'post',
  path: '/category',
  summary: 'Create Category',
  tags: ['Category'],
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
})

registry.registerPath({
  method: 'get',
  path: '/category/{id}',
  summary: 'Get Category by ID',
  tags: ['Category'],
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
})

registry.registerPath({
  method: 'get',
  path: '/category',
  summary: 'Get all Categories',
  tags: ['Category'],
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
            }),
          ),
        },
      },
    },
  },
})

registry.registerPath({
  method: 'delete',
  path: '/category/{id}',
  summary: 'Delete Category by ID',
  tags: ['Category'],
  security: [{ bearerAuth: [] }],
  request: {
    params: DeleteCategoryParamsSchema,
  },
  responses: {
    204: {
      description: 'Successful response with delete a category',
    },
  },
})

registry.registerPath({
  method: 'put',
  path: '/category/{id}',
  summary: 'Update Category',
  tags: ['Category'],
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
})

registry.registerPath({
  method: 'post',
  path: '/product',
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
})

registry.registerPath({
  method: 'get',
  path: '/product/{id}',
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
})

registry.registerPath({
  method: 'get',
  path: '/product',
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
            }),
          ),
        },
      },
    },
  },
})

registry.registerPath({
  method: 'put',
  path: '/product/{id}',
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
})

registry.registerPath({
  method: 'delete',
  path: '/product/{id}',
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
})

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})

export { registry }
