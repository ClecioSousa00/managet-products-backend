import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'

import { RegisterUserUseCase } from './register-user-use-case'

import { InvalidEmail } from '@/core/errors/invalid-email-error'

import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { makeUser } from 'test/factories/makeUser'

let inMemoryUserRepository: InMemoryUserRepository
let registerUserUseCase: RegisterUserUseCase

describe('Register Use Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    registerUserUseCase = new RegisterUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to register a user', async () => {
    const user = makeUser()

    await registerUserUseCase.execute(user)

    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        email: user.email,
      }),
    )
  })
  it('Should not be able to register a user with wrong email', async () => {
    await expect(() =>
      registerUserUseCase.execute({
        email: 'johndoegmail.com',
        username: 'John Doe',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidEmail)
  })
  it('Should not be able to register a user with same email', async () => {
    const user1 = makeUser({ username: 'John Doe 1' })

    await registerUserUseCase.execute(user1)
    const user2 = makeUser({ username: 'John Doe 2' })

    await expect(() =>
      registerUserUseCase.execute(user2),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    expect(inMemoryUserRepository.items).toHaveLength(1)
  })
})
