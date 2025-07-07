import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { HttpRequest } from '@/shared/controller'

const registerBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

type RegisterBodyUser = z.infer<typeof registerBodySchema>

export const registerValidationUser = validateRequest(
  'body',
  registerBodySchema,
)

export type RegisterRequest = HttpRequest<RegisterBodyUser>
