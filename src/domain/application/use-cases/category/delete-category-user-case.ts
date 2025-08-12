import { UniqueEntityId } from '@/shared/entities/unique-entity-id';
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import type { UseCase } from '@/shared/use-case';
import type { CategoryRepository } from '../../repositories/category-repository';
import type { UserRepository } from '../../repositories/user-repository';

interface InputDto {
  id: string;
  userId: string;
}

type OutputDto = {};

export class DeleteCategoryUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private categoryRepository: CategoryRepository,
    private userRepository: UserRepository
  ) {}

  async execute({ id, userId }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(new UniqueEntityId(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    const category = await this.categoryRepository.findById(
      new UniqueEntityId(id),
      new UniqueEntityId(userId)
    );

    if (!category) {
      throw new CategoryNotFoundError();
    }

    await this.categoryRepository.delete(new UniqueEntityId(id));

    return {};
  }
}
