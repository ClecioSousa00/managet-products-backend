import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const categoryParamsSchema = z.object({
  id: z.string(),
})

type CategoryParams = z.infer<typeof categoryParamsSchema>

export const GetByIdCategoryValidation = validateRequest(
  'params',
  categoryParamsSchema,
)

export type GetByIdCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  CategoryParams
>
