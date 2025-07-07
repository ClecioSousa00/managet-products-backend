import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const createCategoryBodySchema = z.object({
  name: z.string().min(3),
})

type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>

export const createCategoryValidation = validateRequest(
  'body',
  createCategoryBodySchema,
)

export type CreateCategoryRequest = AuthenticatedHttpRequest<CreateCategoryBody>
