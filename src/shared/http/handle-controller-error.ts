import { StatusCodes } from 'http-status-codes';
import type { HttpResponse } from '../controller';
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error';
import { CategoryNotFoundError } from '../errors/category-not-found-error';
import { InvalidQuantityProductError } from '../errors/invalid-quantity-product-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';

export const handleControllerError = (error: unknown): HttpResponse => {
  if (error instanceof WrongCredentialsError) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      body: error.message,
    };
  }

  if (error instanceof UserNotFoundError) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }

  if (error instanceof ResourceNotFoundError) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: error.message,
    };
  }

  if (error instanceof CategoryAlreadyExistsError) {
    return {
      status: StatusCodes.CONFLICT,
      body: { message: error.message },
    };
  }

  if (error instanceof CategoryNotFoundError) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: { message: error.message },
    };
  }
  if (error instanceof InvalidQuantityProductError) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: { message: error.message },
    };
  }
  console.error('Erro ao criar usuário:', error);
  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    body: { message: 'Internal server error' },
  };
};
