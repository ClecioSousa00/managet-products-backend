import { makeCategory } from 'test/factories/makeCategory';
import { makeUser } from 'test/factories/makeUser';
import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository';
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository';
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error';
import { UserNotFoundError } from '@/shared/errors/user-not-found-error';
import { DeleteCategoryUseCase } from './delete-category-user-case';

let inMemoryCategoryRepository: InMemoryCategoryRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Delete Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(
      inMemoryCategoryRepository,
      inMemoryUserRepository
    );
  });

  it('Should be able to deleta a category', async () => {
    const user = makeUser();

    inMemoryUserRepository.items.push(user);

    const categoryOnDelete = makeCategory({
      userId: user.id,
    });

    const category = makeCategory({
      name: 'new category',
      userId: user.id,
    });

    inMemoryCategoryRepository.items.push(categoryOnDelete, category);

    await deleteCategoryUseCase.execute({
      id: categoryOnDelete.id.toString(),
      userId: user.id.toString(),
    });

    expect(inMemoryCategoryRepository.items).toHaveLength(1);
    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'new category',
        userId: user.id.toString(),
      })
    );
  });

  it('Should not be able to deleta a category if user not found', async () => {
    const user = makeUser();

    inMemoryUserRepository.items.push(user);

    const category = makeCategory({
      name: 'new category',
      userId: user.id,
    });

    inMemoryCategoryRepository.items.push(category);

    await expect(() =>
      deleteCategoryUseCase.execute({
        id: category.id.toString(),
        userId: 'user-id-not-found',
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);

    expect(inMemoryCategoryRepository.items).toHaveLength(1);
  });

  it('Should not be able to delete a category if it does not exist', async () => {
    const user = makeUser();
    inMemoryUserRepository.items.push(user);

    await expect(() =>
      deleteCategoryUseCase.execute({
        id: 'non-existent-category-id',
        userId: user.id.toString(),
      })
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });

  it('Should not delete a category if it does not belong to the user', async () => {
    const user1 = makeUser();
    const user2 = makeUser();

    inMemoryUserRepository.items.push(user1, user2);

    const category = makeCategory({ userId: user1.id });

    inMemoryCategoryRepository.items.push(category);

    await expect(() =>
      deleteCategoryUseCase.execute({
        id: category.id.toString(),
        userId: user2.id.toString(),
      })
    ).rejects.toBeInstanceOf(CategoryNotFoundError);

    expect(inMemoryCategoryRepository.items).toHaveLength(1);
  });
});
