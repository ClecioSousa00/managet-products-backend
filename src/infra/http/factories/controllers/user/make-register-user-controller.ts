import { RegisterUserUseCase } from '@/domain/application/use-cases/user/register-user-use-case';

import { RegisterUserController } from '@/infra/controllers/user/register-user-controller';

import { makeUserRepository } from '../../repositories/user-repository-factory';

export const makeRegisterUserController = () => {
  const userRepository = makeUserRepository();

  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  const registerUserController = new RegisterUserController(
    registerUserUseCase
  );

  return registerUserController;
};
