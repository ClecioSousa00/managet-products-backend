import { CategoryService } from '@/domain/enterprise/domain-services/category-service'
import { InMemoryProductRepository } from 'test/in-memory-repositories/in-memory-product-repository'
import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'
import { GetProductByIdUseCase } from './get-product-by-id-use-case'
import { InMemoryCategoryRepository } from 'test/in-memory-repositories/in-memory-category-repository'
import { makeUser } from 'test/factories/makeUser'
import { makeProduct } from 'test/factories/makeProduct'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryProductRepository: InMemoryProductRepository
let inMemoryCategoryRepository: InMemoryCategoryRepository
let categoryService: CategoryService
let getProductByIdUseCase: GetProductByIdUseCase

describe('Get Product By Id Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemoryCategoryRepository = new InMemoryCategoryRepository()
    categoryService = new CategoryService(inMemoryCategoryRepository)
    getProductByIdUseCase = new GetProductByIdUseCase(
      inMemoryProductRepository,
      inMemoryUserRepository,
      categoryService,
    )
  })

  it('Should be able to get a product by id', async () => {
    const user = makeUser()

    inMemoryUserRepository.items.push(user)
    const product = makeProduct({
      name: 'product-test',
      userId: user.id,
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
})
