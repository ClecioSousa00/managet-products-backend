import { Express } from 'express'
import request from 'supertest'

export const createAndAuthenticateUser = async (app: Express) => {
  await request(app).post('/users').send({
    username: 'John Doe',
    email: 'jonhdoe@gmail.com',
    password: '12345678',
  })
  const responseAuthenticate = await request(app).post('/authenticate').send({
    email: 'jonhdoe@gmail.com',
    password: '12345678',
  })
  const { accessToken } = responseAuthenticate.body
  return { accessToken }
}
