import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const CreateSaleProductBodySchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  salePriceAtTime: z.number(),
});

type CreateSaleProductBody = z.infer<typeof CreateSaleProductBodySchema>;

export const CreateSaleProductValidation = validateRequest(
  'body',
  CreateSaleProductBodySchema
);

export type CreateSaleProductRequest =
  AuthenticatedHttpRequest<CreateSaleProductBody>;
