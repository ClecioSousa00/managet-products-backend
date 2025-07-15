import { z } from 'zod'
import { validateRequest } from '../../middleware/validation-request'
import { HttpRequest } from '@/shared/controller'

export const AuthenticateUserBodySchema = z
  .object({
    email: z.string().email().openapi({}),
    password: z.string().min(8).openapi({}),
  })
  .openapi({ description: 'Authenticate User' })

type AuthenticateUserBody = z.infer<typeof AuthenticateUserBodySchema>

export const authenticateValidationUser = validateRequest(
  'body',
  AuthenticateUserBodySchema,
)

export type AuthenticateRequest = HttpRequest<AuthenticateUserBody>
