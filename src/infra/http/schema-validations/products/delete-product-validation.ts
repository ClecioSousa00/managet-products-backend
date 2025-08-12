import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const DeleteProductParamsSchema = z.object({
  id: z.string(),
});

type DeleteProductParams = z.infer<typeof DeleteProductParamsSchema>;

export const deleteProductValidation = validateRequest(
  'params',
  DeleteProductParamsSchema
);

export type DeleteProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteProductParams
>;
