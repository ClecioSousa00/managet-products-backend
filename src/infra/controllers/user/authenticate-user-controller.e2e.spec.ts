import request from 'supertest';
import app from '@/app';
import { WrongCredentialsError } from '@/shared/errors/wrong-credentials-error';

describe('Authenticate User e2e', () => {
  it('Should be able to authenticate a user', async () => {
    await request(app).post('/users').send({
      username: 'john doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    });
    const response = await request(app).post('/auth/login').send({
      email: 'johndoe@gmail.com',
      password: '12345678',
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      })
    );
  });

  it('Should not be able to authenticate a user if wrong email', async () => {
    await request(app).post('/users').send({
      username: 'john doe',
      email: 'johndoe@hmail.com',
      password: '12345678',
    });

    const response = await request(app).post('/auth/login').send({
      email: 'fakeemail@gmail.com',
      password: '12345678',
    });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: new WrongCredentialsError().message,
      })
    );
  });
  it('Should not be able to authenticate a user if wrong password', async () => {
    await request(app).post('/users').send({
      username: 'john doe',
      email: 'johndoe@hmail.com',
      password: '12345678',
    });

    const response = await request(app).post('/auth/login').send({
      email: 'johndoe@hmail.com',
      password: '123456780',
    });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: new WrongCredentialsError().message,
      })
    );
  });
});
