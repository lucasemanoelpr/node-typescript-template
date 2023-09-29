import { tokens } from '@di/tokens'
import IAuthenticationService from '@domain/authentication/interfaces/IAuthenticationService'
import IController from '@shared/interfaces/IController'
import { Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'
import IRequestWithUser from '@shared/interfaces/IRequestWithUser'
import IUserListFilters from '@domain/authentication/interfaces/IUserListFilters'
import IUserListOrder from '@domain/authentication/interfaces/IUserListOrder'

@injectable()
export default class GetUserListController
  extends BaseController
  implements IController
{
  constructor(
    @inject(tokens.AuthenticationService)
    private authenticationService: IAuthenticationService
  ) {
    super()
  }

  async handle(req: IRequestWithUser, res: Response) {
    try {
      const page = Number(req.query?.page) || 1
      const per_page = Number(req.query?.per_page) || 20
      const filters: IUserListFilters = {
        name: String(req.query.name || ''),
        teams: String(req.query.teams || ''),
      }

      const order: IUserListOrder = {
        order_by: String(req.query.order_by || 'user.name ASC'),
      }

      const users =
        await this.authenticationService.listUsersByCompanyWithPagination(
          req.user.company_id,
          page,
          filters,
          order,
          per_page
        )
      return this.success(res, 'The users were loaded successfully.', users)
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
