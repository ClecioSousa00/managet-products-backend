import { InvalidEmail } from '@/core/errors/invalid-email-error'

export class Email {
  value: string

  constructor(value: string) {
    this.validade(value)
    this.value = value
  }

  private validade(value: string) {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/
    const isValidEmail = regex.test(value)

    if (!isValidEmail) {
      throw new InvalidEmail()
    }
  }

  toValue() {
    return this.value
  }
}
