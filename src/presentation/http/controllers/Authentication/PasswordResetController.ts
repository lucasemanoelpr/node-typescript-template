import { tokens } from '@di/tokens'
import IAuthenticationService from '@domain/authentication/interfaces/IAuthenticationService'
import IController from '@shared/interfaces/IController'
import { Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'
import IRequestWithUser from '@shared/interfaces/IRequestWithUser'

@injectable()
export default class PasswordResetController
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
      const { email } = req.body

      const responsePasswordReset =
        await this.authenticationService.passwordReset(email)

      if (responsePasswordReset) {
        return this.success(res, 'Email for resetting password sent', null, 200)
      } else {
        return this.success(
          res,
          'Email for resetting password was not sent.',
          null,
          200
        )
      }
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
