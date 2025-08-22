import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const UpdateSaleProductParamsSchema = z.object({
  id: z.string(),
});

export const UpdateSaleProductBodySchema = z.object({
  quantity: z.number().optional(),
  salePriceAtTime: z.number().optional(),
});

type UpdateSaleProductParams = z.infer<typeof UpdateSaleProductParamsSchema>;
type UpdateSaleProductBody = z.infer<typeof UpdateSaleProductBodySchema>;

export const updateSaleProductParamsValidation = validateRequest(
  'params',
  UpdateSaleProductParamsSchema
);
export const updateSaleProductBodyValidation = validateRequest(
  'body',
  UpdateSaleProductBodySchema
);

export type UpdateSaleProductRequest = AuthenticatedHttpRequest<
  UpdateSaleProductBody,
  UpdateSaleProductParams
>;
