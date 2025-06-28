/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest<T = any> {
  body: T
  params: any
  query: any
  headers: any
}

export interface HttpResponse {
  status: number
  body?: any
}

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}

export interface AuthenticatedHttpRequest<T = any> extends HttpRequest<T> {
  userId: string
}
