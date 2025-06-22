import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as jwt from 'jsonwebtoken'

export const validation: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers

  console.log('authori', authorization)
  console.log('HEADER', req.headers)

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

  if (!process.env.JWT_SECRET) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decodedToken === 'string') {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'Unauthorized.',
      })
      return
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    })
    return
  }

  next()
}
