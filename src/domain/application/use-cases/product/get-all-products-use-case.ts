import { UseCase } from '@/core/use-case'
import { Category } from '@/domain/enterprise/entities/Category'

import { ProductRepository } from '../../repositories/product-repository'
import { UserRepository } from '../../repositories/user-repository'
import { CategoryRepository } from '../../repositories/category-repository'

import { UserNotFoundError } from '../errors/user-not-found-error'
import { OrderBy, OrderDirection } from '@/core/types/pagination'

interface InputDto {
  userId: string
  page: number
  limit: number
  orderBy?: OrderBy
  orderDirection?: OrderDirection
}

interface ProductDto {
  id: string
  name: string
  categoryName: string
  createdAt: Date
  salePrice: number
  quantity: number
}

interface PaginationDto {
  page: number
  prevPageUrl: number | null
  nextPageUrl: number | null
  totalPages: number
  totalProducts: number
}

interface OutputDto {
  products: ProductDto[]
  pagination: PaginationDto
}

export class GetAllProductsUseCase implements UseCase<InputDto, OutputDto> {
  constructor(
    private productRepository: ProductRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    limit,
    page,
    userId,
    orderBy,
    orderDirection,
  }: InputDto): Promise<OutputDto> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const offset = (page - 1) * limit

    // TODO: ADICIONAR ORDENAÇÃO
    const products = await this.productRepository.findMany(
      { limit, offset },
      userId,
      orderBy,
      orderDirection,
    )

    const totalProducts = await this.productRepository.count()

    const categories = await this.categoryRepository.findMany()

    const productsDto: ProductDto[] = products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      quantity: product.quantity,
      salePrice: product.salePrice,
      categoryName: this.getNameCategory(product.categoryId, categories),
      createdAt: product.createdAt,
    }))

    const totalPages = Math.ceil(totalProducts / limit)

    const pagination: PaginationDto = {
      page,
      prevPageUrl: page - 1 === 0 ? null : page - 1,
      nextPageUrl: page + 1 > totalPages ? null : page + 1,
      totalPages,
      totalProducts,
    }

    return {
      products: productsDto,
      pagination,
    }
  }

  private getNameCategory(categoryId: string, categories: Category[]) {
    const category = categories.find(
      (category) => category.id.toString() === categoryId,
    )

    return category ? category.name : ''
  }
}
