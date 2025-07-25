import express from 'express'

import swaggerUi from 'swagger-ui-express'

import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

import { routes } from './infra/http/routes/router'
import { env } from './env'
import { registry } from './swagger-docs'

const app = express()
app.use(express.json())

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))

app.use(routes)

export default app
