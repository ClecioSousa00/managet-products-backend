import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { makeUser } from 'test/factories/makeUser'
import { makeProduct } from 'test/factories/makeProduct'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

import { GetProductByIdUseCase } from './get-product-by-id-use-case'
import { makeCategory } from 'test/factories/makeCategory'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepository: InMemoryProductRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let getProductByIdUseCase: GetProductByIdUseCase

describe('Get Product By Id Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    getProductByIdUseCase = new GetProductByIdUseCase(
      inMemoryProductRepository,
      inMemoryUserRepository,
      inMemoryCategoryRepository,
    )
  })

  it('Should be able to get a product by id', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    const category = makeCategory()

    inMemoryCategoryRepository.items.push(category)

    const product = makeProduct({
      name: 'product-test',
      userId: user.id,
      categoryId: category.id.toString(),
    })

    inMemoryProductRepository.items.push(product)
    inMemoryProductRepository.items.push(makeProduct())

    const productOutput = await getProductByIdUseCase.execute({
      userId: user.id.toString(),
      productId: product.id.toString(),
    })

    expect(productOutput.id).toEqual(productOutput.id)
    expect(productOutput).toEqual(
      expect.objectContaining({
        id: product.id.toString(),
        name: product.name,
      }),
    )
  })
  it('should not be able to get product if ID is wrong', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    await expect(() =>
      getProductByIdUseCase.execute({
        userId: user.id.toString(),
        productId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to get product if user id is wrong', async () => {
    const product = makeProduct()

    await expect(() =>
      getProductByIdUseCase.execute({
        userId: 'user-id-not-exists',
        productId: product.id.toString(),
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
