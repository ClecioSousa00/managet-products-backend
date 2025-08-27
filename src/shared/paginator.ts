export interface Pagination {
  limit: number;
  offset: number;
}

export interface PaginationResult {
  page: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
}

export class Paginator {
  static getOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  static build(
    page: number,
    limit: number,
    totalItems: number
  ): PaginationResult {
    const totalPages = Math.ceil(totalItems / limit);

    return {
      page,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalPages,
      totalItems,
    };
  }
}
