import { UseCase } from '@/shared/use-case'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'
import bcrypt from 'bcryptjs'
import { UserRepository } from '../../repositories/user-repository'

interface InputDto {
  email: string
  password: string
}

// inverter a dependencia da lib para criar o token
interface OutputDto {
  accessToken: string
}

export class AuthenticateUserUseCase implements UseCase<InputDto, OutputDto> {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new WrongCredentialsError()
    }

    const isSamePassword = await bcrypt.compare(password, user.password)

    if (!isSamePassword) {
      throw new WrongCredentialsError()
    }

    return {
      accessToken: user.id.toString(),
    }
  }
}
