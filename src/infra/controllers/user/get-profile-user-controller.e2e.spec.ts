import request from 'supertest';
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user';
import app from '@/app';

describe('Get User Profile (E2E)', () => {
  it('Should be able to get a user profile', async () => {
    const { accessToken } = await createAndAuthenticateUser(app, {
      email: 'johndoe@gmail.com',
      username: 'john doe',
      password: '12345678',
    });

    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        username: 'john doe',
        email: 'johndoe@gmail.com',
      })
    );
  });
});
