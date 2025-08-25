import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Delete Sale Product Controller (E2E)', () => {
  it('Should delete a product', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category',
      });

    const categoryResponse = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${accessToken}`);

    const category = categoryResponse.body.categories[0];

    await request(app)
      .post('/product')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'new product',
        quantity: 5,
        salePrice: 3000,
        purchasePrice: 1000,
      });
    const getProductsResponse = await request(app)
      .get('/product?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    const product = getProductsResponse.body.products[0];

    const saleProductResponse = await request(app)
      .post('/sale-products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        productId: product.id,
        quantity: 4,
        salePriceAtTime: 2000,
      });

    const deleteSaleProductResponse = await request(app)
      .delete(`/sale-products/${saleProductResponse.body.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(deleteSaleProductResponse.statusCode).toBe(204);

    const getSaleProduct = await request(app)
      .get(`/sale-products/${saleProductResponse.body.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(getSaleProduct.statusCode).toBe(404);
  });
});
