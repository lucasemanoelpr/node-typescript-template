import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'
import IController from '@shared/interfaces/IController'
import { Request, Response, Router } from 'express'
import IBaseRoute from '@shared/interfaces/IBaseRoute'
import { validateSchemaMiddleware } from '../middlewares/ValidateSchemaMiddleware'
import { passwordChangeRequestSchema } from '../requestSchemas/user/PasswordChangeRequestSchema'

@injectable()
export class UserRoutes implements IBaseRoute {
  constructor(
    @inject(tokens.GetUserListController)
    private getUserListController: IController,

    @inject(tokens.GetUserController)
    private getUserController: IController,

    @inject(tokens.UpdateUserController)
    private updateUserController: IController,

    @inject(tokens.PasswordChangeController)
    private passwordChangeController: IController
  ) {}

  setup() {
    const router = Router()

    router.get('/list', async (req: Request, res: Response) => {
      return await this.getUserListController.handle(req, res)
    })

    router.get('/:id', async (req: Request, res: Response) => {
      return await this.getUserController.handle(req, res)
    })

    router.put('/:id', async (req: Request, res: Response) => {
      return await this.updateUserController.handle(req, res)
    })

    router.post(
      '/new-password',
      validateSchemaMiddleware(passwordChangeRequestSchema),
      async (req: Request, res: Response) => {
        return await this.passwordChangeController.handle(req, res)
      }
    )

    return router
  }
}
