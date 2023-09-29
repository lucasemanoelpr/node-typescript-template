import { inject, injectable } from 'tsyringe'
import { Request, Response, Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares/ValidateSchemaMiddleware'
import { companyCreateRequestSchema } from '../requestSchemas/company/CompanyCreateRequestSchema'
import { tokens } from '@di/tokens'
import IController from '@shared/interfaces/IController'
import { companyUpdateRequestSchema } from '../requestSchemas/company/CompanyUpdateRequestSchema'
import IBaseRoute from '@shared/interfaces/IBaseRoute'

@injectable()
export class CompanyRoutes implements IBaseRoute {
  constructor(
    @inject(tokens.CompanyCreateController)
    private companyCreateController: IController,

    @inject(tokens.CompanyUpdateController)
    private companyUpdateController: IController
  ) { }

  setup() {
    const router = Router()
    router.post(
      '/',
      validateSchemaMiddleware(companyCreateRequestSchema),
      async (req: Request, res: Response) => {
        return await this.companyCreateController.handle(req, res)
      }
    )

    router.patch(
      '/:id',
      validateSchemaMiddleware(companyUpdateRequestSchema),
      async (req: Request, res: Response) =>
        await this.companyUpdateController.handle(req, res)
    )

    return router
  }
}
