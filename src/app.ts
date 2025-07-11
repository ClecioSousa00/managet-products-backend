import express from 'express'
import { routes } from './infra/http/routes/router'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from './env'

const app = express()
app.use(express.json())

const swaggerDocs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Manager Products',
      version: '1.0.0',
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
        },
      ],
    },
  },
  apis: ['src/infra/http/routes/router.ts'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(routes)

export default app
