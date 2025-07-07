import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const updateCategoryParamsSchema = z.object({
  id: z.string(),
})

const updateCategoryBodySchema = z.object({
  name: z.string().min(3),
})

type UpdateCategoryParamsSchema = z.infer<typeof updateCategoryParamsSchema>
type UpdateCategoryBodySchema = z.infer<typeof updateCategoryBodySchema>

export const updateCategoryParamsValidation = validateRequest(
  'params',
  updateCategoryParamsSchema,
)
export const updateCategoryBodyValidation = validateRequest(
  'body',
  updateCategoryBodySchema,
)

export type UpdateCategoryRequest = AuthenticatedHttpRequest<
  UpdateCategoryBodySchema,
  UpdateCategoryParamsSchema
>
