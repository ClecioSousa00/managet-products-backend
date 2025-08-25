import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Get All Products Controller (E2E)', () => {
  it('Should be able to get all products and pagination', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category',
      });

    const categoryResponse = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

    const category = categoryResponse.body.categories[0];

    await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'new product',
        quantity: 2,
        salePrice: 3000,
        purchasePrice: 1000,
      });

    await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'new product 2',
        quantity: 3,
        salePrice: 4000,
        purchasePrice: 2000,
      });

    const productsResponse = await request(app)
      .get('/products?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(productsResponse.statusCode).toBe(200);

    expect(productsResponse.body.products).toEqual([
      expect.objectContaining({
        name: 'new product',
        quantity: 2,
        salePrice: 3000,
      }),
      expect.objectContaining({
        name: 'new product 2',
        quantity: 3,
        salePrice: 4000,
      }),
    ]);
  });

  it('Should be able to get all products and pagination with order directions desc', async () => {
    const { accessToken } = await createAndAuthenticateUser(app, {
      email: 'user-1@gmail.com',
    });

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category',
      });

    const categoryResponse = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

    const category = categoryResponse.body.categories[0];

    await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'A new product',
        quantity: 2,
        salePrice: 3000,
        purchasePrice: 1000,
      });

    await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'B new product',
        quantity: 3,
        salePrice: 4000,
        purchasePrice: 2000,
      });

    const productsResponse = await request(app)
      .get('/products?limit=10&page=1&orderDirection=desc')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(productsResponse.statusCode).toBe(200);

    expect(productsResponse.body.products).toEqual([
      expect.objectContaining({
        name: 'B new product',
        quantity: 3,
        salePrice: 4000,
      }),
      expect.objectContaining({
        name: 'A new product',
        quantity: 2,
        salePrice: 3000,
      }),
    ]);
  });
});
