import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '@/infra/auth/jwt';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    });
    return;
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    });
    return;
  }

  try {
    const jwtService = new JWTService();
    const jwtData = jwtService.verify(token);
    req.userId = jwtData.sub;
    // biome-ignore lint/correctness/noUnusedVariables: <>
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthorized.',
    });
    return;
  }

  next();
};
