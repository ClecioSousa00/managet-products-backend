import bcrypt from 'bcryptjs'

import { InMemoryUserRepository } from 'test/in-memory-repositories/in-memory-user-repository'

import { AuthenticateUserUseCase } from './authenticate-user-use-case'

import { User } from '@/domain/enterprise/entities/user'
import { Email } from '@/domain/enterprise/value-objects/Email'

import { WrongCredentialsError } from '../errors/wrong-credentials-error'

let inMemoryUserRepository: InMemoryUserRepository
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
    )
  })

  it('Should be able to authenticate a user', async () => {
    const user = User.create({
      email: new Email('johndoe@gmail.com'),
      username: 'John Doe',
      password: await bcrypt.hash('12345678', 8),
    })

    inMemoryUserRepository.create(user)

    const { accessToken } = await authenticateUserUseCase.execute({
      email: user.email,
      password: '12345678',
    })

    expect(accessToken).toEqual(expect.any(String))
  })
  it('Should  not be able to authenticate if not exists user', async () => {
    await expect(() =>
      authenticateUserUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
  it('Should not be able to authenticate with wrong password', async () => {
    const user = User.create({
      email: new Email('johndoe@gmail.com'),
      username: 'John Doe',
      password: await bcrypt.hash('12345678', 8),
    })

    inMemoryUserRepository.create(user)

    await expect(() =>
      authenticateUserUseCase.execute({
        email: user.email,
        password: '9999999999',
      }),
    ).rejects.toBeInstanceOf(WrongCredentialsError)
  })
})
