import app from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Delete Category Controller (E2E)', () => {
  it('Should be able to delete a category', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category 1',
      })

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category 2',
      })

    const categoriesResponse = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${accessToken}`)

    const category = categoriesResponse.body.categories[0]

    const deleteResponse = await request(app)
      .delete(`/category/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(deleteResponse.statusCode).toBe(204)

    const newCategoryResponse = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(newCategoryResponse.body.categories).toHaveLength(1)
    expect(newCategoryResponse.body.categories).toEqual([
      expect.objectContaining({
        name: 'new category 2',
      }),
    ])
  })
})
