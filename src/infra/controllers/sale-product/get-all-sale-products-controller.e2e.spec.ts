import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Get All Sale Products Controller (E2E)', () => {
  it('Should get all sale products', async () => {
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

    const productsResponse = await request(app)
      .get('/products?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    const product = productsResponse.body.products[0];

    await request(app)
      .post('/sale-products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        productId: product.id,
        quantity: 3,
        salePriceAtTime: 2000,
      });
    await request(app)
      .post('/sale-products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        productId: product.id,
        quantity: 1,
        salePriceAtTime: 4000,
      });

    const getAllSaleProductsResponse = await request(app)
      .get('/sale-products?limit=10&page=1')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(getAllSaleProductsResponse.statusCode).toBe(200);

    expect(getAllSaleProductsResponse.body.saleProducts[0].quantity).toBe(1);
    expect(getAllSaleProductsResponse.body.saleProducts[0].product).toEqual(
      expect.objectContaining({
        id: product.id,
        name: 'new product',
      })
    );
    expect(
      getAllSaleProductsResponse.body.saleProducts[0].salePriceAtTime
    ).toBe(4000);

    expect(getAllSaleProductsResponse.body.saleProducts[1].quantity).toBe(3);
    expect(
      getAllSaleProductsResponse.body.saleProducts[1].salePriceAtTime
    ).toBe(2000);
  });
});
