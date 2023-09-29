import { tokens } from '@di/tokens'
import ICompanyService from '@domain/company/interfaces/ICompanyService'
import IController from '@shared/interfaces/IController'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'

@injectable()
export class CompanyUpdateController
  extends BaseController
  implements IController
{
  constructor(
    @inject(tokens.CompanyService)
    private companyService: ICompanyService
  ) {
    super()
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const companyUpdated = await this.companyService.update(
        req.params.id,
        req.body
      )
      return this.success(res, 'Empresa atualizada.', companyUpdated, 201)
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
