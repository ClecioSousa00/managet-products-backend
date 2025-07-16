import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const DeleteCategoryParamsSchema = z.object({
  id: z.string(),
})

type DeleteCategoryParams = z.infer<typeof DeleteCategoryParamsSchema>

export const deleteCategoryValidation = validateRequest(
  'params',
  DeleteCategoryParamsSchema,
)

export type DeleteCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteCategoryParams
>
