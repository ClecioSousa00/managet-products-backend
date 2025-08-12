/** biome-ignore-all lint/suspicious/noExplicitAny: tipagem genérica */

export interface HttpRequestBase<B = any, P = any, Q = any> {
  body: B;
  params: P;
  query: Q;
  headers: any;
}

export interface AuthenticatedHttpRequest<B = any, P = any, Q = any>
  extends HttpRequestBase<B, P, Q> {
  userId: string;
}

export type HttpRequest<B = any, P = any, Q = any> =
  | HttpRequestBase<B, P, Q>
  | AuthenticatedHttpRequest<B, P, Q>;

export interface HttpResponse {
  status: number;
  body?: any;
}

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
