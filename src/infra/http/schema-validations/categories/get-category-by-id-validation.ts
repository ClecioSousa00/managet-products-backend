import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const CategoryParamsSchema = z.object({
  id: z.string(),
})

type CategoryParams = z.infer<typeof CategoryParamsSchema>

export const GetByIdCategoryValidation = validateRequest(
  'params',
  CategoryParamsSchema,
)

export type GetByIdCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  CategoryParams
>
