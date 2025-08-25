import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';
import { CategoryNotFoundError } from '@/shared/errors/category-not-found-error';

describe('Create Product Controller (E2E)', () => {
  it('Should be able to create a product', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'category 1',
      });

    const categoryResponse = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

    const category = categoryResponse.body.categories[0];

    const productResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: category.id,
        name: 'new product',
        quantity: 2,
        salePrice: 3000,
        purchasePrice: 1000,
      });

    expect(productResponse.statusCode).toBe(201);
  });
  it('Should not create a product if the category does not exist', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    const productResponse = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        categoryId: 'fake-category-id',
        name: 'new product',
        quantity: 2,
        salePrice: 3000,
        purchasePrice: 1000,
      });

    expect(productResponse.statusCode).toBe(404);
    expect(productResponse.body).toEqual(
      expect.objectContaining({
        message: new CategoryNotFoundError().message,
      })
    );
  });
});
