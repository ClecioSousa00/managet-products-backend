import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const CreateProductBodySchema = z.object({
  categoryId: z.string(),
  name: z.string().min(3),
  quantity: z.number(),
  salePrice: z.number(),
  purchasePrice: z.number(),
  imageBase64: z
    .string()
    .regex(/^[A-Za-z0-9+/=]+$/, 'Invalid base64 image')
    .optional(),
});

type CreateProductBody = z.infer<typeof CreateProductBodySchema>;

export const CreateProductBodyValidation = validateRequest(
  'body',
  CreateProductBodySchema
);

export type CreateProductRequest = AuthenticatedHttpRequest<CreateProductBody>;
