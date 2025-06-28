/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequestBase<T = any> {
  body: T
  params: any
  query: any
  headers: any
}

export interface AuthenticatedHttpRequest<T = any> extends HttpRequestBase<T> {
  userId: string
}

export type HttpRequest<T = any> =
  | HttpRequestBase<T>
  | AuthenticatedHttpRequest<T>

export interface HttpResponse {
  status: number
  body?: any
}

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}
