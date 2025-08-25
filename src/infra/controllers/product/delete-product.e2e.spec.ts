import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Delete Product (E2E)', () => {
  it('Should be able to delete a product', async () => {
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
        quantity: 2,
        salePrice: 3000,
        purchasePrice: 1000,
      });

    const productsResponse = await request(app)
      .get('/products?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    const product = productsResponse.body.products[0];

    const getProductByIdResponse = await request(app)
      .delete(`/products/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(getProductByIdResponse.statusCode).toBe(204);

    const newProductsResponse = await request(app)
      .get('/products?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(newProductsResponse.body.products).toHaveLength(1);
  });
});
