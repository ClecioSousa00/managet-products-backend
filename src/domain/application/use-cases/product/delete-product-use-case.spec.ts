import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/makeUser'
import { makeProduct } from 'test/factories/makeProduct'

import { DeleteProductUseCase } from './delete-product-use-case'

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepository: InMemoryProductRepository
let deleteProductUseCase: DeleteProductUseCase

describe('Delete Product Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    deleteProductUseCase = new DeleteProductUseCase(
      inMemoryUserRepository,
      inMemoryProductRepository,
    )
  })
  it('Should be able to delete a product', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    const productOnDelete = makeProduct({
      name: 'delete-product',
      userId: user.id,
    })

    const product = makeProduct({ name: 'product-not-delete', userId: user.id })

    inMemoryProductRepository.items.push(productOnDelete, product)

    await deleteProductUseCase.execute({
      userId: user.id.toString(),
      productId: productOnDelete.id.toString(),
    })

    expect(inMemoryProductRepository.items).toHaveLength(1)
    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'product-not-delete',
      }),
    )
  })
  it('Should not be able to delete a product with wrong id', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    inMemoryProductRepository.items.push(makeProduct(), makeProduct())

    await expect(() =>
      deleteProductUseCase.execute({
        userId: user.id.toString(),
        productId: 'product-id-not-exists',
      }),
    ).rejects.instanceOf(ResourceNotFoundError)

    expect(inMemoryProductRepository.items).toHaveLength(2)
  })
  it('Should not be able to delete a product with wrong user id', async () => {
    const product = makeProduct()

    inMemoryProductRepository.items.push(product)

    await expect(() =>
      deleteProductUseCase.execute({
        userId: 'user-id-not-exists',
        productId: product.id.toString(),
      }),
    ).rejects.instanceOf(UserNotFoundError)

    expect(inMemoryProductRepository.items).toHaveLength(1)
  })
  it('Should be able to delete a product from the correct user ', async () => {
    const user1 = makeUser()
    const user2 = makeUser()

    inMemoryUserRepository.items.push(user1, user2)

    const productUser1 = makeProduct({ userId: user1.id })
    const productUser2 = makeProduct({
      userId: user2.id,
      name: 'product user 2',
    })

    inMemoryProductRepository.items.push(productUser1, productUser2)

    await deleteProductUseCase.execute({
      userId: user1.id.toString(),
      productId: productUser1.id.toString(),
    })
    expect(inMemoryProductRepository.items).toHaveLength(1)
    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        id: productUser2.id,
        name: 'product user 2',
      }),
    )
  })
})
