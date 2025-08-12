import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import type { HttpRequest } from '@/shared/controller';

import { validateRequest } from '../../middleware/validation-request';

extendZodWithOpenApi(z);

export const RegisterUserBodySchema = z
  .object({
    username: z.string().min(3).openapi({}),
    email: z.string().email().openapi({}),
    password: z.string().min(8).openapi({}),
  })
  .openapi({ description: 'Register User Schema' });

type RegisterUserBody = z.infer<typeof RegisterUserBodySchema>;

export const registerValidationUser = validateRequest(
  'body',
  RegisterUserBodySchema
);

export type RegisterRequest = HttpRequest<RegisterUserBody>;
