import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Get All Categories (E2E)', () => {
  it('Should be able to get all categories', async () => {
    const { accessToken } = await createAndAuthenticateUser(app);

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category 1',
      });

    await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'new category 2',
      });

    const response = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.categories).toHaveLength(2);
    expect(response.body.categories).toEqual([
      expect.objectContaining({
        name: 'new category 1',
        id: expect.any(String),
      }),
      expect.objectContaining({
        name: 'new category 2',
        id: expect.any(String),
      }),
    ]);
  });
});
