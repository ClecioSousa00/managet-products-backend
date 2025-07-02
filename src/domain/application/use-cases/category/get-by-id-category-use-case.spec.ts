import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { GetByIdCategoryUseCase } from './get-by-id-category-use-case'
import { makeUser } from 'test/factories/makeUser'
import { makeCategory } from 'test/factories/makeCategory'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let getByIdCategoryUseCase: GetByIdCategoryUseCase

describe('Get By Id Category Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()

    getByIdCategoryUseCase = new GetByIdCategoryUseCase(
      inMemoryCategoryRepository,
      inMemoryUserRepository,
    )
  })

  it('Should be able to get a category by id', async () => {
    const user = makeUser()

    const category = makeCategory({ name: 'category 1', userId: user.id })

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category)

    const id = category.id.toString()
    const userId = user.id.toString()

    const newCategory = await getByIdCategoryUseCase.execute({ id, userId })

    expect(newCategory).toEqual(
      expect.objectContaining({
        name: 'category 1',
        id,
      }),
    )
  })
  it('Should not take a category that does not exist', async () => {
    const user = makeUser()

    const category = makeCategory({ name: 'category 1', userId: user.id })

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category)

    const userId = user.id.toString()

    await expect(() =>
      getByIdCategoryUseCase.execute({ id: 'fake-id', userId }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError)
  })
})
