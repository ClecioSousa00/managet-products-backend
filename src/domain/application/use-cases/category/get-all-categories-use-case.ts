import { UseCase } from '@/shared/use-case'
import { CategoryRepository } from '../../repositories/category-repository'
import { UserRepository } from '../../repositories/user-repository'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

interface InputDto {
  userId: string
}

interface OutputDto {
  categories: {
    id: string
    name: string
  }[]
}

export class GetAllCategoriesUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const categories = await this.categoryRepository.findMany(
      new UniqueEntityId(userId),
    )

    const categoriesDto = categories.map((item) => ({
      id: item.id.toString(),
      name: item.name,
    }))

    return {
      categories: categoriesDto,
    }
  }
}
