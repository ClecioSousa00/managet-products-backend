import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const getProductParamsSchema = z.object({
  id: z.string(),
})

type GetProductParams = z.infer<typeof getProductParamsSchema>

export const getProductByIdValidation = validateRequest(
  'params',
  getProductParamsSchema,
)

export type GetProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  GetProductParams
>
