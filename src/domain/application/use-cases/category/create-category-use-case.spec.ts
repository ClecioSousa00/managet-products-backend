import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { CreateCategoryUseCase } from './create-category-use-case'
import { makeUser } from 'test/factories/makeUser'
import { CategoryNameAlreadyExistsError } from '@/shared/errors/category-name-already-exists-error'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryUserRepository: InMemoryUserRepository
let createCategoryUseCase: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoryRepository,
      inMemoryUserRepository,
    )
  })

  it('Should be able to create a new category', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    await createCategoryUseCase.execute({
      categoryName: 'New Category',
      userId: user.id.toString(),
    })

    expect(inMemoryCategoryRepository.items).toHaveLength(1)

    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'New Category',
        userId: user.id.toString(),
      }),
    )
  })
  it('Should not be able to create a category if category name exists', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    await createCategoryUseCase.execute({
      categoryName: 'New Category',
      userId: user.id.toString(),
    })

    await expect(() =>
      createCategoryUseCase.execute({
        categoryName: 'new Category',
        userId: user.id.toString(),
      }),
    ).rejects.toBeInstanceOf(CategoryNameAlreadyExistsError)

    expect(inMemoryCategoryRepository.items).toHaveLength(1)
  })

  it('Should not be able to create a category if user not exists', async () => {
    await expect(() =>
      createCategoryUseCase.execute({
        categoryName: 'New Category',
        userId: 'user-id-not-exists',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)

    expect(inMemoryCategoryRepository.items).toHaveLength(0)
  })
})
