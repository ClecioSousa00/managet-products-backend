import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const deleteCategoryParamsSchema = z.object({
  id: z.string(),
})

type DeleteCategoryParams = z.infer<typeof deleteCategoryParamsSchema>

export const deleteCategoryValidation = validateRequest(
  'params',
  deleteCategoryParamsSchema,
)

export type DeleteCategoryRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteCategoryParams
>
