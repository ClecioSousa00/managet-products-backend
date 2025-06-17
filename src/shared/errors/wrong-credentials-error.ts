export class WrongCredentialsError extends Error {
  constructor() {
    super('Invalid Credentials.')
  }
}
