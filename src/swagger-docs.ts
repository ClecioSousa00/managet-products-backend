import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { RegisterUserBodySchema } from './infra/http/schema-validations/user/register-validation'
import { z } from 'zod'
import { AuthenticateUserBodySchema } from './infra/http/schema-validations/user/authenticate-validation'

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
      description: 'User Created',
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
  summary: 'Authorize User',
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
      description: 'Successful response with user authenticate',
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

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})

export { registry }
