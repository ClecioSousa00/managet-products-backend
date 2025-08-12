import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const UpdateProductParamsSchema = z.object({
  id: z.string(),
});

export const UpdateProductBodySchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().optional(),
  quantity: z.number().optional(),
  salePrice: z.number().optional(),
  purchasePrice: z.number().optional(),
});

type UpdateProductParams = z.infer<typeof UpdateProductParamsSchema>;
type UpdateProductBody = z.infer<typeof UpdateProductBodySchema>;

export const updateProductParamsValidation = validateRequest(
  'params',
  UpdateProductParamsSchema
);
export const updateProductBodyValidation = validateRequest(
  'body',
  UpdateProductBodySchema
);

export type UpdateProductRequest = AuthenticatedHttpRequest<
  UpdateProductBody,
  UpdateProductParams
>;
