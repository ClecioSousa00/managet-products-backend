import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/makeUser'
import { makeCategory } from 'test/factories/makeCategory'
import { makeProduct } from 'test/factories/makeProduct'

import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

import { GetAllProductsUseCase } from './get-all-products-use-case'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepository: InMemoryProductRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let getAllProductsUseCase: GetAllProductsUseCase

describe('Get All Products Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    getAllProductsUseCase = new GetAllProductsUseCase(
      inMemoryProductRepository,
      inMemoryUserRepository,
      inMemoryCategoryRepository,
    )
  })

  it('Should be able get all products with pagination', async () => {
    const user = makeUser()
    const category = makeCategory()

    inMemoryUserRepository.items.push(user)
    inMemoryCategoryRepository.items.push(category)

    const product = makeProduct({
      userId: user.id,
      categoryId: category.id.toString(),
    })

    for (let i = 0; i < 22; i++) {
      inMemoryProductRepository.items.push(product)
    }

    const { products, pagination } = await getAllProductsUseCase.execute({
      limit: 10,
      page: 3,
      userId: user.id.toString(),
    })

    expect(products).toHaveLength(2)
    expect(pagination.prevPageUrl).toBe(2)
    expect(pagination.nextPageUrl).toBe(null)
  })

  it('Should throw if user does not exist', async () => {
    await expect(() =>
      getAllProductsUseCase.execute({
        limit: 10,
        page: 1,
        userId: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('Should return null for categoryName if category not found', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    const product = makeProduct({
      userId: user.id,
    })

    inMemoryProductRepository.items.push(product)

    const { products } = await getAllProductsUseCase.execute({
      limit: 10,
      page: 1,
      userId: user.id.toString(),
    })

    expect(products).toHaveLength(1)
    expect(products).toEqual([expect.objectContaining({ categoryName: null })])
  })

  it('Should return empty list if paga is out of range', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)

    const product = makeProduct({
      userId: user.id,
    })

    inMemoryProductRepository.items.push(product)

    const { products } = await getAllProductsUseCase.execute({
      limit: 10,
      page: 2,
      userId: user.id.toString(),
    })

    expect(products).toHaveLength(0)
  })
})

it('Should be able to pagination products by name and asc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
  })
  inMemoryProductRepository.items.push(bProduct, aProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Aproduct' }),
    expect.objectContaining({ name: 'Bproduct' }),
  ])
})

it('Should be able to pagination products by name and desc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
  })
  inMemoryProductRepository.items.push(aProduct, bProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderDirection: 'desc',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Bproduct' }),
    expect.objectContaining({ name: 'Aproduct' }),
  ])
})

it('Should be able to pagination products by name date asc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
    createdAt: new Date(),
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
    createdAt: new Date('2024-01-01'),
  })
  inMemoryProductRepository.items.push(bProduct, aProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderBy: 'date',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Aproduct' }),
    expect.objectContaining({ name: 'Bproduct' }),
  ])
})

it('Should be able to pagination products by name date desc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
    createdAt: new Date(),
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
    createdAt: new Date('2024-01-01'),
  })
  inMemoryProductRepository.items.push(bProduct, aProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderBy: 'date',
    orderDirection: 'desc',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Bproduct' }),
    expect.objectContaining({ name: 'Aproduct' }),
  ])
})

it('Should be able to pagination products by sale price asc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
    salePrice: 3000,
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
    salePrice: 2000,
  })
  inMemoryProductRepository.items.push(bProduct, aProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderBy: 'salePrice',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Aproduct' }),
    expect.objectContaining({ name: 'Bproduct' }),
  ])
})
it('Should be able to pagination products by sale price desc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
    salePrice: 3000,
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
    salePrice: 2000,
  })
  inMemoryProductRepository.items.push(aProduct, bProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderBy: 'salePrice',
    orderDirection: 'desc',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Bproduct' }),
    expect.objectContaining({ name: 'Aproduct' }),
  ])
})

it('Should be able to pagination products by quantity asc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
    quantity: 10,
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
    quantity: 2,
  })
  inMemoryProductRepository.items.push(bProduct, aProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderBy: 'quantity',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Aproduct' }),
    expect.objectContaining({ name: 'Bproduct' }),
  ])
})

it('Should be able to pagination products by quantity desc order', async () => {
  const user = makeUser()

  inMemoryUserRepository.items.push(user)

  const bProduct = makeProduct({
    userId: user.id,
    name: `Bproduct`,
    quantity: 10,
  })

  const aProduct = makeProduct({
    userId: user.id,
    name: `Aproduct`,
    quantity: 2,
  })
  inMemoryProductRepository.items.push(aProduct, bProduct)

  const { products } = await getAllProductsUseCase.execute({
    limit: 2,
    page: 1,
    userId: user.id.toString(),
    orderBy: 'quantity',
    orderDirection: 'desc',
  })

  expect(products).toEqual([
    expect.objectContaining({ name: 'Bproduct' }),
    expect.objectContaining({ name: 'Aproduct' }),
  ])
})
