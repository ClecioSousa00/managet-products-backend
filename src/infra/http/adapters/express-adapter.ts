import type { Request, Response } from 'express';
import type {
  Controller,
  HttpRequestBase,
  HttpResponse,
} from '@/shared/controller';

export const ExpressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequestBase = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    if (req.userId) {
      // biome-ignore lint/suspicious/noExplicitAny: <>
      (httpRequest as any).userId = req.userId;
    }

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    if (httpResponse.body) {
      res.status(httpResponse.status).json(httpResponse.body);
    } else {
      res.sendStatus(httpResponse.status);
    }
  };
};
