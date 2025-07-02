import app from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Get By Id Category E2E', () => {
  it('Should be able to get a category', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'category 1',
      })

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'category 2',
      })

    const responseGetAllCategories = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${accessToken}`)

    const category = responseGetAllCategories.body.categories[0]

    const responseUpdateCategory = await request(app)
      .get(`/category/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(responseUpdateCategory.statusCode).toBe(200)

    expect(responseUpdateCategory.body).toEqual(
      expect.objectContaining({
        name: 'category 1',
        id: category.id,
      }),
    )
  })
})
