import { UseCase } from '@/shared/use-case'
import { Category } from '@/domain/enterprise/entities/Category'
import {
  OrderBy,
  OrderDirection,
  PaginationProducts,
} from '@/shared/types/pagination'
import { UniqueEntityId } from '@/shared/entities/unique-entity-id'
import { UserNotFoundError } from '@/shared/errors/user-not-found-error'

import { ProductRepository } from '../../repositories/product-repository'
import { UserRepository } from '../../repositories/user-repository'
import { CategoryRepository } from '../../repositories/category-repository'

interface ProductProps {
  id: string
  name: string
  categoryName: string
  createdAt: Date
  salePrice: number
  quantity: number
}

interface InputDto {
  userId: string
  page: number
  limit: number
  orderBy?: OrderBy
  orderDirection?: OrderDirection
}

interface OutputDto {
  products: ProductProps[]
  pagination: PaginationProducts
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
    const user = await this.userRepository.findById(new UniqueEntityId(userId))

    if (!user) {
      throw new UserNotFoundError()
    }

    const offset = (page - 1) * limit
    const orderField: OrderBy = orderBy ?? 'name'
    const orderDir: OrderDirection = orderDirection ?? 'asc'

    const products = await this.productRepository.findMany(
      { limit, offset },
      user.id,
      orderField,
      orderDir,
    )

    const totalProducts = await this.productRepository.count()

    const categories = await this.categoryRepository.findMany(user.id)

    const productsDto: ProductProps[] = products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      quantity: product.quantity,
      salePrice: product.salePrice,
      categoryName: this.getNameCategory(
        new UniqueEntityId(product.categoryId),
        categories,
      ),
      createdAt: product.createdAt,
    }))

    const totalPages = Math.ceil(totalProducts / limit)

    const pagination: PaginationProducts = {
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

  private getNameCategory(categoryId: UniqueEntityId, categories: Category[]) {
    const category = categories.find((category) =>
      category.id.equals(categoryId),
    )

    return category ? category.name : ''
  }
}
