export class InsufficientStockError extends Error {
  constructor() {
    super('Not enough product in stock to complete sale')
  }
}
