import { UseCase } from '@/shared/use-case'
import { User } from '@/domain/enterprise/entities/user'
import { Email } from '@/domain/enterprise/value-objects/Email'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import bcrypt from 'bcryptjs'
import { UserRepository } from '../../repositories/user-repository'

interface InputDto {
  email: string
  password: string
  username: string
}

interface OutputDto {}

export class RegisterUserUseCase implements UseCase<InputDto, OutputDto> {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password, username }: InputDto): Promise<OutputDto> {
    const userEmail = new Email(email)

    const existsUserSameEmail = await this.userRepository.findByEmail(email)

    if (existsUserSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await bcrypt.hash(password, 8)

    const user = User.create({
      email: userEmail,
      password: passwordHash,
      username,
    })

    await this.userRepository.create(user)

    return {}
  }
}
