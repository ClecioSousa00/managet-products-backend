import { UseCase } from '@/shared/use-case'
import { CategoryRepository } from '../../repositories/category-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'

interface InputDto {
  id: string
  userId: string
}

interface OutputDto {}

export class DeleteCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ id, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const category = await this.categoryRepository.findById(
      new UniqueEntityId(id),
      new UniqueEntityId(userId),
    )

    if (!category) {
      throw new CategoryNotFoundError()
    }

    await this.categoryRepository.delete(new UniqueEntityId(id))

    return {}
  }
}
