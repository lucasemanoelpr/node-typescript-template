import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import IAuthenticationService from '@domain/authentication/interfaces/IAuthenticationService'
import IUser from '@domain/authentication/interfaces/IUser'
import IController from '@shared/interfaces/IController'
import BaseController from '../BaseController'

type RequestParams = {
  id: string
}

interface UpdateUserRequest extends Request<RequestParams, {}, Partial<IUser>> {
  user: {
    id: string
    name: string
    email: string
    company_id: string
    created_at: Date
    created_by: string
  }
}

@injectable()
export default class UpdateUserController
  extends BaseController
  implements IController
{
  constructor(
    @inject(tokens.AuthenticationService)
    private authenticationService: IAuthenticationService
  ) {
    super()
  }

  async handle(req: UpdateUserRequest, res: Response) {
    try {
      if (req.user.id !== req.params.id) {
        return this.success(res, 'Unauthorized', null, 401)
      }

      const user = await this.authenticationService.getUser(req.params.id)

      if (!user) {
        return this.success(res, 'User not found', null, 404)
      }

      const { name, email, bio, mobile_phone, avatar_url, password } = req.body

      const userToUpdate: Partial<IUser> = {}

      if (name !== undefined) {
        Object.assign(userToUpdate, { name })
      }

      if (email !== undefined) {
        Object.assign(userToUpdate, { email })
      }

      if (bio !== undefined) {
        Object.assign(userToUpdate, { bio })
      }

      if (mobile_phone !== undefined) {
        Object.assign(userToUpdate, { mobile_phone })
      }

      if (avatar_url !== undefined) {
        Object.assign(userToUpdate, { avatar_url })
      }

      if (password !== undefined) {
        Object.assign(userToUpdate, { password })
      }

      const updatedUser = await this.authenticationService.updateUser(
        req.params.id,
        userToUpdate
      )

      if (updatedUser) {
        return this.success(
          res,
          'User updated.',
          {
            name: updatedUser.name,
            bio: updatedUser.bio,
            email: updatedUser.email,
            mobile_phone: updatedUser.mobile_phone,
            avatar_url: updatedUser.avatar_url,
            company: updatedUser.company,
          },
          200
        )
      }

      return this.error(res, 'User not found.')
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
