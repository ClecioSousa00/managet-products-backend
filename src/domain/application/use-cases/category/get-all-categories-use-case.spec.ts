import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { GetAllCategoriesUseCase } from './get-all-categories-use-case'
import { makeUser } from 'test/factories/makeUser'
import { makeCategory } from 'test/factories/makeCategory'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryUserRepository: InMemoryUserRepository
let getAllCategoriesUseCase: GetAllCategoriesUseCase

describe('Get All Categories Use Case', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    getAllCategoriesUseCase = new GetAllCategoriesUseCase(
      inMemoryCategoryRepository,
      inMemoryUserRepository,
    )
  })

  it('Should be able get all categories', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)
    for (let i = 0; i < 5; i++) {
      const category = makeCategory({
        name: `category - ${i}`,
        userId: user.id,
      })
      inMemoryCategoryRepository.items.push(category)
    }

    const { categories } = await getAllCategoriesUseCase.execute({
      userId: user.id.toString(),
    })

    expect(categories).toHaveLength(5)
    expect(categories[0]).toEqual(
      expect.objectContaining({
        name: 'category - 0',
      }),
    )
  })
  it('Should not be able get all categories if user not found', async () => {
    for (let i = 0; i < 5; i++) {
      const category = makeCategory({
        name: `category - ${i}`,
      })
      inMemoryCategoryRepository.items.push(category)
    }

    await expect(() =>
      getAllCategoriesUseCase.execute({
        userId: 'user-id-not-found',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
