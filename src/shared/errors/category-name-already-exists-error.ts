export class CategoryNameAlreadyExistsError extends Error {
  constructor() {
    super('Category name already exists.')
  }
}
