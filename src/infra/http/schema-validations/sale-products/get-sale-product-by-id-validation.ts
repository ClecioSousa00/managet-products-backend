import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const GetSaleProductParamsSchema = z.object({
  id: z.string(),
});

type GetSaleProductParams = z.infer<typeof GetSaleProductParamsSchema>;

export const getSaleProductByIdValidation = validateRequest(
  'params',
  GetSaleProductParamsSchema
);

export type GetSaleProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  GetSaleProductParams
>;
