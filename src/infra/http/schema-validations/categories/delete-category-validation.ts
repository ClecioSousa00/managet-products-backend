import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const DeleteCategoryParamsSchema = z.object({
  id: z.string(),
});

type DeleteCategoryParams = z.infer<typeof DeleteCategoryParamsSchema>;

export const deleteCategoryValidation = validateRequest(
  'params',
  DeleteCategoryParamsSchema
);

export type DeleteCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteCategoryParams
>;
