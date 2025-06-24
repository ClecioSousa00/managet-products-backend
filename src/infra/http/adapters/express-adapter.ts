// infra/http/adapters/express-adapter.ts
import { Controller, HttpRequest } from '@/shared/controller'
import { Request, Response } from 'express'

export const ExpressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.body) {
      res.status(httpResponse.status).json(httpResponse.body)
    } else {
      res.sendStatus(httpResponse.status)
    }
  }
}
