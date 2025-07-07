import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const deleteProductParamsSchema = z.object({
  id: z.string(),
})

type DeleteProductParams = z.infer<typeof deleteProductParamsSchema>

export const deleteProductValidation = validateRequest(
  'params',
  deleteProductParamsSchema,
)

export type DeleteProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteProductParams
>
