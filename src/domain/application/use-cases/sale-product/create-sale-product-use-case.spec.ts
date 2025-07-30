import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { CreateSaleProductUseCase } from './create-sale-product-use-case'
import { InMemorySaleProductRepository } from 'test/in-memory-repositories/in-memory-sale-product-repository'
import { makeUser } from 'test/factories/makeUser'
import { makeProduct } from 'test/factories/makeProduct'
import { InsufficientStockError } from '@/shared/errors/InsufficientStockError'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepository: InMemoryProductRepository
let inMemorySaleProductRepository: InMemorySaleProductRepository
let createSaleProductUseCase: CreateSaleProductUseCase

describe('Create Sale Product Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemorySaleProductRepository = new InMemorySaleProductRepository()
    createSaleProductUseCase = new CreateSaleProductUseCase(
      inMemoryUserRepository,
      inMemoryProductRepository,
      inMemorySaleProductRepository,
    )
  })

  it('Should be able to sale a product', async () => {
    const user = makeUser()
    const userId = user.id.toString()

    inMemoryUserRepository.items.push(user)

    const product = makeProduct({
      userId: user.id,
      quantity: 10,
      salePrice: 1000,
    })
    const productId = product.id.toString()

    inMemoryProductRepository.items.push(product)

    await createSaleProductUseCase.execute({
      userId,
      productId,
      quantity: 9,
      salePriceAtTime: product.salePrice,
    })

    expect(inMemoryProductRepository.items[0]).toEqual(
      expect.objectContaining({
        quantity: 1,
      }),
    )

    const saleProduct = inMemorySaleProductRepository.items[0]

    expect(saleProduct.quantity).toBe(9)
    expect(saleProduct.salePriceAtTime).toBe(1000)
    expect(saleProduct.userId.toString()).toBe(userId)
    expect(saleProduct.productId).toBe(productId)
  })

  it('Should not be able to sale product if insufficient quantity', async () => {
    const user = makeUser()
    const userId = user.id.toString()

    inMemoryUserRepository.items.push(user)

    const product = makeProduct({
      userId: user.id,
      quantity: 10,
    })
    const productId = product.id.toString()

    inMemoryProductRepository.items.push(product)

    await expect(() =>
      createSaleProductUseCase.execute({
        userId,
        productId,
        quantity: 12,
        salePriceAtTime: product.salePrice,
      }),
    ).rejects.toBeInstanceOf(InsufficientStockError)
  })
})
