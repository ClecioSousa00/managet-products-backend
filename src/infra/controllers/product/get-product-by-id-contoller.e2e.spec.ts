import app from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'

describe('Get Product By Id Controller (E2e)', () => {
  it('Should get a product by id', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category',
      })

    const categoryResponse = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${accessToken}`)

    const category = categoryResponse.body.categories[0]

    await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'new product',
        quantity: 2,
        salePrice: 3000,
        purchasePrice: 1000,
      })

    await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'new product 2',
        quantity: 3,
        salePrice: 4000,
        purchasePrice: 2000,
      })

    const productsResponse = await request(app)
      .get('/product?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`)

    const product = productsResponse.body.products[0]

    const getProductByIdResponse = await request(app)
      .get(`/product/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(getProductByIdResponse.statusCode).toBe(200)

    expect(getProductByIdResponse.body.product).toEqual(
      expect.objectContaining({
        name: 'new product',
        quantity: 2,
        salePrice: 3000,
      }),
    )
  })
})
