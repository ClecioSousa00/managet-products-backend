import { makeCategory } from 'test/factories/makeCategory';
import { makeUser } from 'test/factories/makeUser';
import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository';
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository';
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository';

import { CreateProductUseCase } from './create-product-use-case';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryProductRepository: InMemoryProductRepository;
let inMemoryCategoryRepository: InMemoryCategoryRepository;
let createProductUseCase: CreateProductUseCase;

describe('Create Product Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProductRepository = new InMemoryProductRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    createProductUseCase = new CreateProductUseCase(
      inMemoryProductRepository,
      inMemoryUserRepository,
      inMemoryCategoryRepository
    );
  });

  it('Should be able to create a product', async () => {
    const user = makeUser();

    inMemoryUserRepository.items.push(user);

    const category = makeCategory({ userId: user.id });

    inMemoryCategoryRepository.items.push(category);

    await createProductUseCase.execute({
      categoryId: category.id.toString(),
      userId: user.id.toString(),
      name: 'Notebook',
      purchasePrice: 2500,
      salePrice: 3000,
      quantity: 5,
    });
    expect(inMemoryProductRepository.items).toHaveLength(1);

    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'Notebook',
      })
    );
  });
});
