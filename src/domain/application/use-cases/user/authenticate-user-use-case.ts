import bcrypt from 'bcryptjs';
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error';
import type { UseCase } from '@/shared/use-case';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  email: string;
  password: string;
}

interface OutputDto {
  id: string;
}

export class AuthenticateUserUseCase implements UseCase<InputDto, OutputDto> {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new WrongCredentialsError();
    }

    return {
      id: user.id.toString(),
    };
  }
}
