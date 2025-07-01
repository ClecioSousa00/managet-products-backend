import { UseCase } from '@/shared/use-case'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { CategoryAlreadyExistsError } from '@/shared/errors/category-already-exists-error'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'

import { CategoryRepository } from '../../repositories/category-repository'
import { UserRepository } from '../../repositories/user-repository'

interface InputDto {
  name: string
  userId: string
  id: string
}

interface OutputDto {}

export class UpdateCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ name, userId, id }: InputDto): Promise<OutputDto> {
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

    if (category.name === name.trim()) {
      return {}
    }

    const categoryNameAlreadyExists = await this.categoryRepository.findByName(
      name,
      new UniqueEntityId(userId),
    )

    if (categoryNameAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    category.updateName(name)
    await this.categoryRepository.update(category)

    return {}
  }
}
