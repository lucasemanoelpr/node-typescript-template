import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { validateSchemaMiddleware } from './ValidateSchemaMiddleware'

describe('validateSchemaMiddleware', () => {
  const req = {
    body: {},
  } as Request

  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  })

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response

  const next = jest.fn() as unknown as NextFunction

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call next() if validation is successful', async () => {
    Object.defineProperties(req, {
      body: {
        value: { email: 'john.doe@email.com', password: 'mystrongpassword' },
        writable: true,
      },
    })

    const middleware = validateSchemaMiddleware(schema)

    await middleware(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  it('should return a 422 status if validation fails', async () => {
    Object.defineProperties(req, {
      body: {
        value: { email: 'john.doe@email.com' },
        writable: true,
      },
    })

    const middleware = validateSchemaMiddleware(schema)

    await middleware(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({
      error: 'password is a required field',
    })
  })
})
