/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequestBase<B = any, P = any> {
  body: B
  params: P
  query: any
  headers: any
}

export interface AuthenticatedHttpRequest<B = any, P = any>
  extends HttpRequestBase<B, P> {
  userId: string
}

export type HttpRequest<B = any, P = any> =
  | HttpRequestBase<B, P>
  | AuthenticatedHttpRequest<B, P>

export interface HttpResponse {
  status: number
  body?: any
}

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}
