import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Update product Controller (E2E)', () => {
  it('Should be able to update a product', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category',
      });
    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category 2',
      });

    const categoryResponse = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

    const category = categoryResponse.body.categories[0];
    const categoryToUpdateProduct = categoryResponse.body.categories[1];

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

    const productsResponse = await request(app)
      .get('/products?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    const product = productsResponse.body.products[0];

    await request(app)
      .put(`/products/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: categoryToUpdateProduct.id,
        name: 'update product',
        quantity: 4,
        salePrice: 5000,
      });

    const categoryUpdatedResponse = await request(app)
      .get(`/products/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(categoryUpdatedResponse.statusCode).toBe(200);

    expect(categoryUpdatedResponse.body.product).toEqual(
      expect.objectContaining({
        categoryName: 'new category 2',
        name: 'update product',
        quantity: 4,
        salePrice: 5000,
      })
    );
  });
});
