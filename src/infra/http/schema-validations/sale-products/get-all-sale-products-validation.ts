import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import {
  orderByValues,
  orderDirectionValues,
} from '@/shared/types/search-params';
import { validateRequest } from '../../middleware/validation-request';

export const GetAllSaleProductsQuerySchema = z.object({
  limit: z.coerce.number().default(10),
  page: z.coerce.number().default(0),
  orderBy: z.enum(orderByValues).optional(),
  orderDirection: z.enum(orderDirectionValues).optional(),
});

type GetAllSaleProductsQuery = z.infer<typeof GetAllSaleProductsQuerySchema>;

export const getAllSaleProductsQueryValidation = validateRequest(
  'query',
  GetAllSaleProductsQuerySchema
);

export type GetAllProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  Record<string, never>,
  GetAllSaleProductsQuery
>;
