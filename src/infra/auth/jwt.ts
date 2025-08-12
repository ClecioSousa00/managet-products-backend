import * as jwt from 'jsonwebtoken';
import { env } from '@/env';

import { InvalidTokenError } from '@/shared/errors/invalid-token-error';
import type { IJWTService, IJwtData } from '@/shared/jwt-service';

export class JWTService implements IJWTService {
  sign(data: IJwtData): string {
    return jwt.sign(data, env.JWT_SECRET, { expiresIn: '24h' });
  }

  verify(token: string): IJwtData {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);

      if (typeof decoded === 'string') {
        throw new InvalidTokenError();
      }
      return decoded as IJwtData;
      // biome-ignore lint/correctness/noUnusedVariables: <>
    } catch (error) {
      throw new InvalidTokenError();
    }
  }
}
