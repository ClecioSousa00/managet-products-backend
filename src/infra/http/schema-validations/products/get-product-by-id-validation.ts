import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const GetProductParamsSchema = z.object({
  id: z.string(),
})

type GetProductParams = z.infer<typeof GetProductParamsSchema>

export const getProductByIdValidation = validateRequest(
  'params',
  GetProductParamsSchema,
)

export type GetProductRequest = AuthenticatedHttpRequest<
  Record<string, never>,
  GetProductParams
>
