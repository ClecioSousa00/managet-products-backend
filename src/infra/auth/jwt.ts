import { env } from '@/env'
import { InvalidTokenError } from '@/shared/errors/invalid-token-error'
import * as jwt from 'jsonwebtoken'

interface JwtData {
  sub: string
}

const sign = (data: JwtData) => {
  return jwt.sign(data, env.JWT_SECRET, { expiresIn: '24h' })
}

const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    if (typeof decoded === 'string') throw new InvalidTokenError()

    return decoded as JwtData
  } catch (error) {
    throw new InvalidTokenError()
  }
}

export const JWTService = {
  sign,
  verify,
}
