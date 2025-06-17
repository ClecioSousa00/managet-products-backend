import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toString() {
    return this.value
  }

  equals(id: UniqueEntityId) {
    return id.toString() === this.value
  }
}
