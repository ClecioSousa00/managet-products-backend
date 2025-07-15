import express from 'express'
import { routes } from './infra/http/routes/router'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from './env'
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi'
import { RegisterUserBodySchema } from './infra/http/schema-validations/user/register-validation'

const app = express()
app.use(express.json())

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

const generator = new OpenApiGeneratorV3(registry.definitions)
const openApiSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Manager Products',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}`,
    },
  ],
})

// const swaggerDocs = swaggerJsdoc({
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Manager Products',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: `http://localhost:${env.PORT}`,
//       },
//     ],
//   },
//   apis: ['./src/infra/http/routes/router.ts'],
// })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

app.use(routes)

export default app
