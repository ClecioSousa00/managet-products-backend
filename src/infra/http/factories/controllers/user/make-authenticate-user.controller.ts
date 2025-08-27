import { AuthenticateUserUseCase } from '@/domain/application/use-cases/user/authenticate-user-use-case';
import { JWTService } from '@/infra/auth/jwt';
import { AuthenticateUserController } from '@/infra/controllers/user/authenticate-user-controller';

import { makeUserRepository } from '../../repositories/user-repository-factory';

export const makeAuthenticateUserController = () => {
  const jwtService = new JWTService();
  const userRepository = makeUserRepository();

  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
    jwtService
  );

  return authenticateUserController;
};
