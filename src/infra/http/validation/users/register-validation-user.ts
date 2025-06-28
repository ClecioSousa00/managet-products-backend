import { z } from 'zod'
import { validateRequest } from '@/infra/http/middleware/validation-request'

const registerBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

export type RegisterBodyUser = z.infer<typeof registerBodySchema>

export const registerValidationUser = validateRequest(
  'body',
  registerBodySchema,
)
