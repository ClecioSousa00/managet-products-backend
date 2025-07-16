import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const CreateCategoryBodySchema = z.object({
  name: z.string().min(3),
})

type CreateCategoryBody = z.infer<typeof CreateCategoryBodySchema>

export const createCategoryValidation = validateRequest(
  'body',
  CreateCategoryBodySchema,
)

export type CreateCategoryRequest = AuthenticatedHttpRequest<CreateCategoryBody>
