import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Update Category E2E', () => {
  it('Should be able to updated a category', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'category 1',
      });

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'category 2',
      });

    const responseGetAllCategories = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

    const category = responseGetAllCategories.body.categories[0];

    const responseUpdateCategory = await request(app)
      .put(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'update category 1',
      });

    expect(responseUpdateCategory.statusCode).toBe(200);

    const responseGetByIdCategory = await request(app)
      .get(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    const newCategory = responseGetByIdCategory.body;

    expect(newCategory).toEqual(
      expect.objectContaining({
        name: 'update category 1',
        id: category.id,
      })
    );
  });

  it('Should not take a category that does not exist', async () => {
    const { accessToken } = await createAndAuthenticateUser(app, {
      email: 'user1@gmail.com',
    });

    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'category 1',
      });

    const responseUpdateCategory = await request(app)
      .put('/categories/fake-id-category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'update category 1',
      });

    expect(responseUpdateCategory.statusCode).toBe(404);

    const responseGetAllCategories = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(responseGetAllCategories.body.categories).toHaveLength(1);

    const category = responseGetAllCategories.body.categories[0];

    expect(category).toEqual(
      expect.objectContaining({
        name: 'category 1',
        id: category.id,
      })
    );
  });
});
