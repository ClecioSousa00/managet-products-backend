import type { Express } from 'express';
import request from 'supertest';

type UserProps = {
  username?: string;
  email?: string;
  password?: string;
};

export const createAndAuthenticateUser = async (
  app: Express,
  userProps?: UserProps
) => {
  await request(app)
    .post('/users')
    .send({
      username: 'John Doe',
      email: 'jonhdoe@gmail.com',
      password: '12345678',
      ...userProps,
    });
  const responseAuthenticate = await request(app)
    .post('/auth/login')
    .send({
      email: 'jonhdoe@gmail.com',
      password: '12345678',
      ...userProps,
    });
  const { accessToken } = responseAuthenticate.body;
  return { accessToken };
};
