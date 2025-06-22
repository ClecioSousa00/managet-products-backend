import express from 'express'
import { routes } from './infra/http/routes/router'

const app = express()

app.use(express.json())
app.use(routes)

export default app
