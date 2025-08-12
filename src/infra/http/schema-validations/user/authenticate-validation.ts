import { z } from 'zod';
import type { HttpRequest } from '@/shared/controller';
import { validateRequest } from '../../middleware/validation-request';

export const AuthenticateUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type AuthenticateUserBody = z.infer<typeof AuthenticateUserBodySchema>;

export const authenticateValidationUser = validateRequest(
  'body',
  AuthenticateUserBodySchema
);

export type AuthenticateRequest = HttpRequest<AuthenticateUserBody>;
