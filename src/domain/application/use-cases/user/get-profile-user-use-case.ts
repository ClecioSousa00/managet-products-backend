import { UseCase } from '@/shared/use-case'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UserRepository } from '../../repositories/user-repository'

interface InputDto {
  userId: string
}
interface OutputDto {
  email: string
  username: string
}

export class GetProfileUserUseCase implements UseCase<InputDto, OutputDto> {
  constructor(private userRepository: UserRepository) {}

  async execute({ userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      email: user.email,
      username: user.username,
    }
  }
}
