import { GetProfileUserUseCase } from '@/domain/application/use-cases/user/get-profile-user-use-case';

import { GetProfileUserController } from '@/infra/controllers/user/get-profile-user-controller';
import { UserPrismaRepository } from '@/infra/database/prisma/repositories/user-prisma-repository';

export const makeGetProfileUserController = () => {
  const userRepository = new UserPrismaRepository();

  const getProfileUserUseCase = new GetProfileUserUseCase(userRepository);
  const getProfileUserController = new GetProfileUserController(
    getProfileUserUseCase
  );
  return getProfileUserController;
};
