import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { HttpRequest } from '@/shared/controller'

const authenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type AuthenticateUserBody = z.infer<typeof authenticateUserBodySchema>

export const authenticateValidationUser = validateRequest(
  'body',
  authenticateUserBodySchema,
)

export type AuthenticateRequest = HttpRequest<AuthenticateUserBody>
