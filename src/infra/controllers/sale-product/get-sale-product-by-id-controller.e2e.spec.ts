import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Get Sale Product By Id Controller (E2E)', () => {
  it('Should be able to get a sale product', async () => {
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
        quantity: 5,
        salePrice: 3000,
        purchasePrice: 1000,
      });
    const getProductsResponse = await request(app)
      .get('/products?limit=10&page=1')
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

    const getSaleProduct = await request(app)
      .get(`/sale-products/${saleProductResponse.body.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(getProductsResponse.statusCode).toBe(200);

    expect(getSaleProduct.body.saleProduct).toEqual(
      expect.objectContaining({
        quantity: 4,
        salePriceAtTime: 2000,
        nameProduct: 'new product',
      })
    );
  });
});
