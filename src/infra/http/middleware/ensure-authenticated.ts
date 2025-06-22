import { JWTService } from '@/infra/auth/jwt'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    })
    return
  }

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    })
    return
  }

  try {
    const jwtData = JWTService.verify(token)
    req.userId = jwtData.sub
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    })
    return
  }

  next()
}
