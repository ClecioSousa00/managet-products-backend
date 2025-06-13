export interface Pagination {
  limit: number
  offset: number
}

export type OrderBy = 'name' | 'date' | 'salePrice' | 'quantity'

export type OrderDirection = 'asc' | 'desc'
