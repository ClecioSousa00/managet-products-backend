import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { AuthenticatedHttpRequest } from '@/shared/controller'

export const CreateProductBodySchema = z.object({
  categoryId: z.string(),
  name: z.string().min(3),
  quantity: z.number(),
  salePrice: z.number(),
  purchasePrice: z.number(),
})

type CreateProductBody = z.infer<typeof CreateProductBodySchema>

export const CreateProductBodyValidation = validateRequest(
  'body',
  CreateProductBodySchema,
)

export type CreateProductRequest = AuthenticatedHttpRequest<CreateProductBody>
