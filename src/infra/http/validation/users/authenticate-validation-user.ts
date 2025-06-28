import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type AuthenticateUserBody = z.infer<typeof authenticateUserBodySchema>

export const authenticateValidationUser = validateRequest(
  'body',
  authenticateUserBodySchema,
)
