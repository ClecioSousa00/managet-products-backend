export class InvalidEmailError extends Error {
  constructor() {
    super('Email inválido.')
  }
}
