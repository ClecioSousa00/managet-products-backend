import { UseCase } from '@/shared/use-case'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { CategoryAlreadyExistsError } from '@/shared/errors/category-already-exists-error'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'

import { CategoryRepository } from '../../repositories/category-repository'
import { UserRepository } from '../../repositories/user-repository'

interface InputDto {
  categoryName: string
  userId: string
  categoryId: string
}

interface OutputDto {}

export class UpdateCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    categoryName,
    userId,
    categoryId,
  }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const category = await this.categoryRepository.findById(
      new UniqueEntityId(categoryId),
      new UniqueEntityId(userId),
    )

    if (!category) {
      throw new CategoryNotFoundError()
    }

    if (category.name === categoryName.trim()) {
      return {}
    }

    const categoryNameAlreadyExists = await this.categoryRepository.findByName(
      categoryName,
      new UniqueEntityId(userId),
    )

    if (categoryNameAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    category.updateName(categoryName)
    await this.categoryRepository.update(category)

    return {}
  }
}
