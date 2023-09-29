import { container } from '@di/container'
import AuthenticationMiddleware from '@presentation/http/middlewares/AuthenticationMiddleware'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

describe('AuthenticationMiddleware', () => {
  const authenticationMiddleware = container.resolve(AuthenticationMiddleware)

  const req = {
    body: { token: '' },
    query: { token: '' },
    headers: { 'x-access-token': '' },
  } as unknown as Request

  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response

  const next = jest.fn() as unknown as NextFunction

  it('should return status 403 when no token is provided', async () => {
    await authenticationMiddleware.handle(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toBeCalledWith(403)
    expect(res.send).toBeCalledWith('A token is required for authentication')
  })

  it('should return status 401 when invalid token is provided', async () => {
    const invalidTokenProperty = {
      value: '123456798',
      writable: true,
    }
    Object.defineProperties(req.body, {
      token: invalidTokenProperty,
    })
    Object.defineProperties(req.query, {
      token: invalidTokenProperty,
    })
    Object.defineProperties(req.headers, {
      'x-access-token': invalidTokenProperty,
    })

    await authenticationMiddleware.handle(req, res, next)

    expect(next).not.toHaveBeenCalled()
    expect(res.status).toBeCalledWith(401)
    expect(res.send).toBeCalledWith('Invalid Token')
  })

  it('should call next() when a valid token is provided by req.body', async () => {
    const token = jwt.sign(
      { user_id: '13245679', email: 'johndoe@emai.com' },
      process.env.TOKEN_KEY || '',
      {
        expiresIn: '1m',
      }
    )
    const validTokenProperty = {
      value: token,
      writable: true,
    }
    Object.defineProperties(req.body, {
      token: validTokenProperty,
    })

    await authenticationMiddleware.handle(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('should call next() when a valid token is provided by req.query', async () => {
    const token = jwt.sign(
      { user_id: '13245679', email: 'johndoe@emai.com' },
      process.env.TOKEN_KEY || '',
      {
        expiresIn: '1m',
      }
    )
    const validTokenProperty = {
      value: token,
      writable: true,
    }
    Object.defineProperties(req.query, {
      token: validTokenProperty,
    })

    await authenticationMiddleware.handle(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('should call next() when a valid token is provided by req.headers', async () => {
    const token = jwt.sign(
      { user_id: '13245679', email: 'johndoe@emai.com' },
      process.env.TOKEN_KEY || '',
      {
        expiresIn: '1m',
      }
    )
    const validTokenProperty = {
      value: token,
      writable: true,
    }
    Object.defineProperties(req.headers, {
      'x-access-token': validTokenProperty,
    })

    await authenticationMiddleware.handle(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
