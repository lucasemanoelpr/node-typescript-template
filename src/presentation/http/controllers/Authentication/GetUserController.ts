import { tokens } from '@di/tokens'
import IAuthenticationService from '@domain/authentication/interfaces/IAuthenticationService'
import IController from '@shared/interfaces/IController'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'

type RequestParams = {
  id: string
}

@injectable()
export default class GetUserController
  extends BaseController
  implements IController {
  constructor(
    @inject(tokens.AuthenticationService)
    private authenticationService: IAuthenticationService
  ) {
    super()
  }

  async handle(req: Request<RequestParams>, res: Response) {
    try {
      const user = await this.authenticationService.getUser(req.params.id)

      if (!user) {
        return this.success(res, 'User not found', {}, 404)
      }

      const basicUser = {
        id: user.id,
        created_at: user?.created_at,
        email: user?.email,
        name: user?.name,
        bio: user?.bio,
        mobile_phone: user?.mobile_phone,
      }

      return this.success(res, 'User successfully retrieved.', basicUser)
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
