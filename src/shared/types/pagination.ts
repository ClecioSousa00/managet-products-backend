export interface Pagination {
  limit: number
  offset: number
}

export interface PaginationProducts {
  page: number
  prevPageUrl: number | null
  nextPageUrl: number | null
  totalPages: number
  totalProducts: number
}

export type OrderBy = 'name' | 'date' | 'salePrice' | 'quantity'

export type OrderDirection = 'asc' | 'desc'
