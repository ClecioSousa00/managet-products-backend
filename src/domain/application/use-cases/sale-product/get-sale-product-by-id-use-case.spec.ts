import { InMemorySaleProductRepository } from 'test/in-memory-repositories/in-memory-sale-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { GetSaleProductByIdUseCase } from './get-sale-product-by-id-use-case'
import { makeUser } from 'test/factories/makeUser'
import { makeProduct } from 'test/factories/makeProduct'
import { makeSaleProduct } from 'test/factories/makeSaleProduct'
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemorySaleProductRepository: InMemorySaleProductRepository
let inMemoryProductRepository: InMemoryProductRepository

let getSaleProductByIdUseCase: GetSaleProductByIdUseCase

describe('Get Sale Product By Id Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemorySaleProductRepository = new InMemorySaleProductRepository()
    inMemoryProductRepository = new InMemoryProductRepository()

    getSaleProductByIdUseCase = new GetSaleProductByIdUseCase(
      inMemoryUserRepository,
      inMemorySaleProductRepository,
      inMemoryProductRepository,
    )
  })

  it('Should get a sale product by id', async () => {
    const user = makeUser()

    const product = makeProduct({
      userId: user.id,
      name: 'new product',
    })

    const saleProduct = makeSaleProduct({
      userId: user.id,
      quantity: 2,
      productId: product.id,
    })

    inMemoryUserRepository.items.push(user)
    inMemoryProductRepository.items.push(product)
    inMemorySaleProductRepository.items.push(saleProduct)

    const saleProductResult = await getSaleProductByIdUseCase.execute({
      userId: user.id.toString(),
      saleProductId: saleProduct.id.toString(),
    })

    expect(saleProductResult).toEqual(
      expect.objectContaining({
        nameProduct: 'new product',
        quantity: 2,
        productId: product.id.toString(),
      }),
    )
  })
})
