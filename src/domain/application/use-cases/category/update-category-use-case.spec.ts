import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/makeUser'
import { makeCategory } from 'test/factories/makeCategory'

import { UserNotFoundError } from '@/shared/errors/user-not-found-error'
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error'
import { CategoryAlreadyExistsError } from '@/shared/errors/category-already-exists-error'

import { UpdateCategoryUseCase } from './update-category-use-case'

let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryUserRepository: InMemoryUserRepository
let updateCategoryUseCase: UpdateCategoryUseCase

describe('Update Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    updateCategoryUseCase = new UpdateCategoryUseCase(
      inMemoryCategoryRepository,
      inMemoryUserRepository,
    )
  })

  it('Should be able to updated a category', async () => {
    const user = makeUser()

    const category = makeCategory({
      name: 'category-A',
      userId: user.id,
    })

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category)

    const userId = user.id.toString()
    const categoryId = category.id.toString()

    await updateCategoryUseCase.execute({
      userId,
      categoryId,
      categoryName: 'new category name',
    })

    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'new category name',
      }),
    )
  })
  it('Should not update the category if you pass the wrong  user id ', async () => {
    const category = makeCategory({
      name: 'category-A',
    })

    inMemoryCategoryRepository.items.push(category)

    const categoryId = category.id.toString()

    await expect(() =>
      updateCategoryUseCase.execute({
        userId: 'user-id-not-found',
        categoryId,
        categoryName: 'new category name',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)

    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'category-A',
      }),
    )
  })

  it('Should not update the category if you pass the wrong id ', async () => {
    const user = makeUser()

    const category = makeCategory({
      name: 'category-A',
      userId: user.id,
    })

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category)

    const userId = user.id.toString()

    await expect(() =>
      updateCategoryUseCase.execute({
        userId,
        categoryId: 'category-id-not-found',
        categoryName: 'new category name',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError)

    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'category-A',
      }),
    )
  })

  it('Should not update the category if you pass an existing name', async () => {
    const user = makeUser()

    const categoryA = makeCategory({
      name: 'category-A',
      userId: user.id,
    })

    const categoryB = makeCategory({
      name: 'category-B',
      userId: user.id,
    })

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(categoryA, categoryB)

    const userId = user.id.toString()
    const categoryId = categoryA.id.toString()

    await expect(() =>
      updateCategoryUseCase.execute({
        userId,
        categoryId,
        categoryName: 'category-B',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)

    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'category-A',
      }),
    )
  })
  it('Should not update the category if you pass another user id', async () => {
    const user = makeUser()
    const anotherUser = makeUser()

    const categoryA = makeCategory({
      name: 'category-A',
      userId: user.id,
    })

    const categoryB = makeCategory({
      name: 'category-B',
      userId: user.id,
    })

    inMemoryUserRepository.items.push(user, anotherUser)
    inMemoryCategoryRepository.items.push(categoryA, categoryB)

    const anotherUserId = anotherUser.id.toString()
    const categoryId = categoryA.id.toString()

    await expect(() =>
      updateCategoryUseCase.execute({
        userId: anotherUserId,
        categoryId,
        categoryName: 'category-B',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError)

    expect(inMemoryCategoryRepository.items[0].toJson()).toEqual(
      expect.objectContaining({
        name: 'category-A',
      }),
    )
  })
})
