import { LoginController } from '../controllers/Authentication/LoginController'
import { Application, Response } from 'express'
import request from 'supertest'
import { container } from '@di/container'
import { App } from '../App'

describe('AuthenticationRoutes', () => {
  let app: Application
  let loginController: LoginController

  beforeAll(() => {
    loginController = {
      handle: jest.fn(),
    } as unknown as LoginController
    const appResolved = container.resolve(App)
    app = appResolved.getServer()
  })

  it('should return 422 when sending invalid request data', async () => {
    const response = await request(app).post('/authentication/login').send({
      email: 'invalidemail',
      password: '123456',
    })

    expect(response.status).toBe(422)
  })

  it.skip('should call loginController.handle when sending valid request data', async () => {
    await request(app).post('/authentication/login').send({
      email: 'validemail@example.com',
      password: '123456',
    })

    expect(loginController.handle).toHaveBeenCalledTimes(1)
    expect(loginController.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          email: 'validemail@example.com',
          password: '123456',
        }),
      }),
      expect.anything()
    )
  })

  it.skip('should return the response from loginController.handle when sending valid request data', async () => {
    const user = {
      _id: 'user_id',
      name: 'John Doe',
      email: 'validemail@example.com',
      token: 'token',
    }
    const resUser = {
      user,
    } as unknown as Response

    jest
      .spyOn(loginController, 'handle')
      .mockImplementationOnce(async () => resUser)

    const response = await request(app).post('/authentication/login').send({
      email: 'validemail@example.com',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(user)
  })
})
