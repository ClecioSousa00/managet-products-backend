import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { orderByValues, orderDirectionValues } from '@/shared/types/pagination';
import { validateRequest } from '../../middleware/validation-request';

export const GetAllProductsQuerySchema = z.object({
  limit: z.coerce.number(),
  page: z.coerce.number(),
  orderBy: z.enum(orderByValues).optional(),
  orderDirection: z.enum(orderDirectionValues).optional(),
});

type GetAllProductQuery = z.infer<typeof GetAllProductsQuerySchema>;

export const getAllProductsQueryValidation = validateRequest(
  'query',
  GetAllProductsQuerySchema
);

export type GetAllProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  Record<string, never>,
  GetAllProductQuery
>;
