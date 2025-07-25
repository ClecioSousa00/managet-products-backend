import app from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
  it('should be able to register a user', async () => {
    const response = await request(app).post('/users').send({
      username: 'John Doe',
      email: 'jonhdoe@gmail.com',
      password: '12345678',
    })
    expect(response.statusCode).toEqual(201)
  })
})
