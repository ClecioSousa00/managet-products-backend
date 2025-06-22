export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid JWT token.')
  }
}
