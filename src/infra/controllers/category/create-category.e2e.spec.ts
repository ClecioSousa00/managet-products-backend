import app from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Create Category (E2E)', () => {
  it('Should be able to create a category', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)
    const response = await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category',
      })
    expect(response.statusCode).toBe(201)
  })
})
