import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'

const createCategoryBodySchema = z.object({
  name: z.string().min(3),
})

export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>

export const createCategoryValidation = validateRequest(
  'body',
  createCategoryBodySchema,
)
