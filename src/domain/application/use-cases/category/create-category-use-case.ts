import { UseCase } from '@/shared/use-case'
import { CategoryRepository } from '../../repositories/category-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { Category } from '@/domain/enterprise/entities/Category'
import { CategoryAlreadyExistsError } from '@/shared/errors/category-already-exists-error'

interface InputDto {
  name: string
  userId: string
}

interface OutputDto {}

export class CreateCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ name, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
      user.id,
    )

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = Category.create({
      name: name.trim(),
      userId: user.id,
    })

    await this.categoryRepository.create(category)

    return {}
  }
}
