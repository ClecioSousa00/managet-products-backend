import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const DeleteProductParamsSchema = z.object({
  id: z.string(),
})

type DeleteProductParams = z.infer<typeof DeleteProductParamsSchema>

export const deleteProductValidation = validateRequest(
  'params',
  DeleteProductParamsSchema,
)

export type DeleteProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  DeleteProductParams
>
