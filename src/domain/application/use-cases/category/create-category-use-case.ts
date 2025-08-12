import { Category } from '@/domain/enterprise/entities/category';
import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { CategoryAlreadyExistsError } from '@/shared/errors/category-already-exists-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { CategoryRepository } from '../../repositories/category-repository';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  name: string;
  userId: string;
}

type OutputDto = {};

export class CreateCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ) {}

  async execute({ name, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
      user.id
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = Category.create({
      name: name.trim(),
      userId: user.id,
    });

    await this.categoryRepository.create(category);

    return {};
  }
}
