import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import type { UseCase } from '@/shared/use-case';

import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  userId: string;
}
interface OutputDto {
  email: string;
  username: string;
}

export class GetProfileUserUseCase implements UseCase<InputDto, OutputDto> {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      email: user.email,
      username: user.username,
    };
  }
}
