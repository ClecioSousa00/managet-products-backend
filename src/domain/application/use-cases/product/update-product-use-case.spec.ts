import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { UpdateProductUseCase } from './update-product-use-case'
import { makeProduct } from 'test/factories/makeProduct'
import { makeUser } from 'test/factories/makeUser'
import { makeCategory } from 'test/factories/makeCategory'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

let inMemoryProductRepository: InMemoryProductRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let inMemoryUserRepository: InMemoryUserRepository
let updateProductUseCase: UpdateProductUseCase

describe('Update Product Use Case', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    updateProductUseCase = new UpdateProductUseCase(
      inMemoryProductRepository,
      inMemoryUserRepository,
      inMemoryCategoryRepository,
    )
  })

  it('Should be able to updated a product', async () => {
    const user = makeUser()

    const category = makeCategory({ name: 'category-A' })
    const categoryOnUpdated = makeCategory({ name: 'category-B' })

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category, categoryOnUpdated)

    const product = makeProduct({
      name: 'product-test',
      quantity: 2,
      salePrice: 5000,
      purchasePrice: 4000,
      userId: user.id,
      categoryId: category.id.toString(),
    })

    inMemoryProductRepository.items.push(product)

    await updateProductUseCase.execute({
      id: product.id.toString(),
      userId: product.userId.toString(),
      categoryId: categoryOnUpdated.id.toString(),
      name: 'new name product',
      quantity: 4,
      salePrice: 7000,
      purchasePrice: 6000,
    })

    expect(inMemoryProductRepository.items[0].toJSON()).toEqual(
      expect.objectContaining({
        categoryId: categoryOnUpdated.id.toString(),
        name: 'new name product',
        quantity: 4,
        salePrice: 7000,
        purchasePrice: 6000,
        userId: user.id.toString(),
      }),
    )
  })

  it('Should throw if product does not exist', async () => {
    const user = makeUser()
    const category = makeCategory()

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category)

    await expect(() =>
      updateProductUseCase.execute({
        id: 'product-id-not-exists',
        userId: user.id.toString(),
        categoryId: category.id.toString(),
        name: 'new name product',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should throw if user does not exist', async () => {
    const category = makeCategory()
    inMemoryCategoryRepository.items.push(category)

    const product = makeProduct({
      categoryId: category.id.toString(),
    })

    inMemoryProductRepository.items.push(product)

    await expect(() =>
      updateProductUseCase.execute({
        id: product.id.toString(),
        userId: 'user-id-not-exists',
        categoryId: category.id.toString(),
        name: 'new name product',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('Should throw if category does not exist', async () => {
    const user = makeUser()
    inMemoryUserRepository.items.push(user)
    const product = makeProduct()

    inMemoryProductRepository.items.push(product)

    await expect(() =>
      updateProductUseCase.execute({
        id: product.id.toString(),
        userId: user.id.toString(),
        categoryId: 'category-id-not-exists',
        name: 'new name product',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should throw if product does not belong to the user', async () => {
    const ownerUser = makeUser()
    const anotherUser = makeUser()

    inMemoryUserRepository.items.push(ownerUser, anotherUser)
    const product = makeProduct({ userId: ownerUser.id })
    inMemoryProductRepository.items.push(product)

    await expect(() =>
      updateProductUseCase.execute({
        id: product.id.toString(),
        userId: anotherUser.id.toString(),
        name: 'new name product',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should allow partial update of product', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    const product = makeProduct({
      name: 'product',
      quantity: 5,
      salePrice: 1000,
      purchasePrice: 800,
      userId: user.id,
    })

    inMemoryProductRepository.items.push(product)

    await updateProductUseCase.execute({
      id: product.id.toString(),
      userId: user.id.toString(),
      name: 'updated product name',
      quantity: 3,
    })

    expect(inMemoryProductRepository.items[0].toJSON()).toEqual(
      expect.objectContaining({
        name: 'updated product name',
        quantity: 3,
        salePrice: 1000,
        purchasePrice: 800,
      }),
    )
  })
})
