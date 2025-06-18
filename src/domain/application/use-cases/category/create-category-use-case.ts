import { UseCase } from '@/shared/use-case'
import { CategoryRepository } from '../../repositories/category-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { Category } from '@/domain/enterprise/entities/Category'
import { CategoryNameAlreadyExistsError } from '@/shared/errors/category-name-already-exists-error'

interface InputDto {
  categoryName: string
  userId: string
}

interface OutputDto {}

export class CreateCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ categoryName, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const categoryNameAlreadyExists = await this.categoryRepository.findByName(
      categoryName,
      user.id,
    )

    if (categoryNameAlreadyExists) {
      throw new CategoryNameAlreadyExistsError()
    }

    const category = Category.create({
      name: categoryName.trim(),
      userId: user.id,
    })

    await this.categoryRepository.create(category)

    return {}
  }
}
