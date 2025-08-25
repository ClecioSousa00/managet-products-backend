import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const DeleteSaleProductParamsSchema = z.object({
  id: z.string(),
});

type DeleteSaleProductParams = z.infer<typeof DeleteSaleProductParamsSchema>;

export const deleteSaleProductValidation = validateRequest(
  'params',
  DeleteSaleProductParamsSchema
);

export type DeleteSaleProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteSaleProductParams
>;
