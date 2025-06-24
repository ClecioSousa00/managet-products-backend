/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest {
  body: any
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
