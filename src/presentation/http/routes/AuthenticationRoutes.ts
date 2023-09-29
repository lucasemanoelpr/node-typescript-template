import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'
import IController from '@shared/interfaces/IController'
import { Request, Response, Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/ValidateSchemaMiddleware'
import { loginSchema } from '../requestSchemas/authentication/LoginRequestSchema'
import { newUserRequestSchema } from '../requestSchemas/authentication/NewUserRequestSchema'
import { passwordResetRequestSchema } from '../requestSchemas/authentication/PasswordResetRequestSchema'
import IBaseRoute from '@shared/interfaces/IBaseRoute'

@injectable()
export class AuthenticationRoutes implements IBaseRoute {
  constructor(
    @inject(tokens.LoginController)
    private loginController: IController,

    @inject(tokens.CreateUserController)
    private createUserController: IController,

    @inject(tokens.PasswordResetController)
    private passwordResetController: IController
  ) {}

  setup() {
    const router = Router()
    router.post(
      '/login',
      validateSchemaMiddleware(loginSchema),
      (req: Request, res: Response) => this.loginController.handle(req, res)
    )

    router.post(
      '/user',
      validateSchemaMiddleware(newUserRequestSchema),
      (req: Request, res: Response) =>
        this.createUserController.handle(req, res)
    )

    router.post(
      '/password-reset',
      validateSchemaMiddleware(passwordResetRequestSchema),
      (req: Request, res: Response) =>
        this.passwordResetController.handle(req, res)
    )

    return router
  }
}
