export class InvalidPriceError extends Error {
  constructor() {
    super('Price cannot be negative.')
  }
}
