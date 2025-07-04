import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'

import { GetAllProductsUseCase } from '@/domain/application/use-cases/product/get-all-products-use-case'

import { validateRequest } from '@/infra/http/middleware/validation-request'

import {
  AuthenticatedHttpRequest,
  Controller,
  HttpResponse,
} from '@/shared/controller'
import { handleControllerError } from '@/shared/http/handle-controller-error'
import { orderByValues, orderDirectionValues } from '@/shared/types/pagination'

const getAllProductsQuerySchema = z.object({
  limit: z.coerce.number(),
  page: z.coerce.number(),
  orderBy: z.enum(orderByValues).optional(),
  orderDirection: z.enum(orderDirectionValues).optional(),
})

type GetAllProductQuery = z.infer<typeof getAllProductsQuerySchema>

export const getAllProductsQueryValidation = validateRequest(
  'query',
  getAllProductsQuerySchema,
)

type GetAllProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  Record<string, never>,
  GetAllProductQuery
>

export class GetAllProductsController implements Controller {
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  async handle(request: GetAllProductRequest): Promise<HttpResponse> {
    const userId = request.userId
    const { limit, page, orderBy, orderDirection } = request.query

    try {
      const { products, pagination } = await this.getAllProductsUseCase.execute(
        {
          userId,
          limit: Number(limit),
          page,
          orderBy,
          orderDirection,
        },
      )
      return {
        status: StatusCodes.OK,
        body: {
          products,
          pagination,
        },
      }
    } catch (error) {
      return handleControllerError(error)
    }
  }
}
