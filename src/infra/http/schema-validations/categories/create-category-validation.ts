import { z } from 'zod';
import type { AuthenticatedHttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const CreateCategoryBodySchema = z.object({
  name: z.string().min(3),
});

type CreateCategoryBody = z.infer<typeof CreateCategoryBodySchema>;

export const createCategoryValidation = validateRequest(
  'body',
  CreateCategoryBodySchema
);

export type CreateCategoryRequest =
  AuthenticatedHttpRequest<CreateCategoryBody>;
