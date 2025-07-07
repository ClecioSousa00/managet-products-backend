import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

const updateProductParamsSchema = z.object({
  id: z.string(),
})

const updateProductBodySchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().optional(),
  quantity: z.number().optional(),
  salePrice: z.number().optional(),
  purchasePrice: z.number().optional(),
})

type UpdateProductParams = z.infer<typeof updateProductParamsSchema>
type UpdateProductBody = z.infer<typeof updateProductBodySchema>

export const updateProductParamsValidation = validateRequest(
  'params',
  updateProductParamsSchema,
)
export const updateProductBodyValidation = validateRequest(
  'body',
  updateProductBodySchema,
)

export type UpdateProductRequest = AuthenticatedHttpRequest<
  UpdateProductBody,
  UpdateProductParams
>
