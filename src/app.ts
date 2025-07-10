import express from 'express'
import { routes } from './infra/http/routes/router'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()

const swaggerDocs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Manager Products',
      version: '1.0.0',
    },
  },
  apis: ['./src/infra/http/routes/router.ts'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())
app.use(routes)

export default app
