import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const UpdateCategoryParamsSchema = z.object({
  id: z.string(),
})

export const UpdateCategoryBodySchema = z.object({
  name: z.string().min(3),
})

type UpdateCategoryParamsSchema = z.infer<typeof UpdateCategoryParamsSchema>
type UpdateCategoryBodySchema = z.infer<typeof UpdateCategoryBodySchema>

export const updateCategoryParamsValidation = validateRequest(
  'params',
  UpdateCategoryParamsSchema,
)
export const updateCategoryBodyValidation = validateRequest(
  'body',
  UpdateCategoryBodySchema,
)

export type UpdateCategoryRequest = AuthenticatedHttpRequest<
  UpdateCategoryBodySchema,
  UpdateCategoryParamsSchema
>
