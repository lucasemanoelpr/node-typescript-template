import { tokens } from '@di/tokens'
import IAuthenticationService from '@domain/authentication/interfaces/IAuthenticationService'
import IController from '@shared/interfaces/IController'
import IRequestWithUser from '@shared/interfaces/IRequestWithUser'
import { Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'

@injectable()
export class PasswordChangeController
  extends BaseController
  implements IController
{
  constructor(
    @inject(tokens.AuthenticationService)
    private authenticationService: IAuthenticationService
  ) {
    super()
  }

  async handle(req: IRequestWithUser, res: Response): Promise<Response> {
    try {
      const { password } = req.body
      const { id } = req.user

      const responseUpdatePassword =
        await this.authenticationService.updatePassword(id, password)

      if (responseUpdatePassword) {
        return this.success(res, 'Password has been changed.', null, 200)
      } else {
        return this.success(res, "Password hasn't been changed.", null, 200)
      }
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
