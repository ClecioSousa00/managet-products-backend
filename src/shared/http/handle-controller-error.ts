import { StatusCodes } from 'http-status-codes'
import { HttpResponse } from '../controller'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'

export const handleControllerError = (error: unknown): HttpResponse => {
  if (error instanceof UserNotFoundError) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: error.message,
    }
  }

  if (error instanceof CategoryAlreadyExistsError) {
    return {
      status: StatusCodes.CONFLICT,
      body: { message: error.message },
    }
  }

  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    body: { message: 'Internal server error' },
  }
}
