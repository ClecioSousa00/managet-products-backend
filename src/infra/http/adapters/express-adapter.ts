// infra/http/adapters/express-adapter.ts
import { Controller, HttpRequestBase, HttpResponse } from '@/shared/controller'
import { Request, Response } from 'express'

export const ExpressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequestBase = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    }

    // Se o middleware adicionou userId, inclui dinamicamente
    if (req.userId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(httpRequest as any).userId = req.userId
    }

    const httpResponse: HttpResponse = await controller.handle(httpRequest)

    if (httpResponse.body) {
      res.status(httpResponse.status).json(httpResponse.body)
    } else {
      res.sendStatus(httpResponse.status)
    }
  }
}
