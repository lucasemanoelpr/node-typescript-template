import { tokens } from '@di/tokens'
import ICompanyService from '@domain/company/interfaces/ICompanyService'
import IController from '@shared/interfaces/IController'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'

@injectable()
export class CompanyCreateController
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
      const newCompany = {
        name: req.body.name,
        size: req.body.size,
        cnpj: req.body.cnpj,
        city: req.body.city,
        state: req.body.state,
        area: req.body.area,
      }

      const company = await this.companyService.create(newCompany)
      return this.success(res, 'Empresa criada.', company)
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
