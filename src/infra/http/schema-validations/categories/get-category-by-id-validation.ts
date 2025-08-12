import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const CategoryParamsSchema = z.object({
  id: z.string(),
});

type CategoryParams = z.infer<typeof CategoryParamsSchema>;

export const GetByIdCategoryValidation = validateRequest(
  'params',
  CategoryParamsSchema
);

export type GetByIdCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  CategoryParams
>;
