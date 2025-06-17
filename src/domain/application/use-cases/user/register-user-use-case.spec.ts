import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'

import { RegisterUserUseCase } from './register-user-use-case'

import { InvalidEmailError } from '@/shared/errors/invalid-email-error'
import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error'

let inMemoryUserRepository: InMemoryUserRepository
let registerUserUseCase: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    registerUserUseCase = new RegisterUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to register a user', async () => {
    await registerUserUseCase.execute({
      email: 'johndoe@gmail.com',
      username: 'John Doe',
      password: '12345678',
    })

    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        email: 'johndoe@gmail.com',
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
    ).rejects.toBeInstanceOf(InvalidEmailError)
  })
  it('Should not be able to register a user with same email', async () => {
    await registerUserUseCase.execute({
      email: 'johndoe@gmail.com',
      username: 'John Doe 1',
      password: '12345678',
    })

    await expect(() =>
      registerUserUseCase.execute({
        email: 'johndoe@gmail.com',
        username: 'John Doe 1',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    expect(inMemoryUserRepository.items).toHaveLength(1)
  })
})
