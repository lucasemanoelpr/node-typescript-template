import { tokens } from '@di/tokens'
import IAuthenticationService from '@domain/authentication/interfaces/IAuthenticationService'
import IController from '@shared/interfaces/IController'
import { Request, Response } from 'express'
import { inject, injectable } from 'tsyringe'
import BaseController from '../BaseController'

@injectable()
export class CreateUserController
  extends BaseController
  implements IController {
  constructor(
    @inject(tokens.AuthenticationService)
    private authenticationService: IAuthenticationService
  ) {
    super()
  }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userForm = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }

      const validUser = await this.authenticationService.validateNewUser(
        userForm
      )

      if (!validUser.status) {
        return res.status(409).json({ error: validUser.error })
      }

      const newUser = await this.authenticationService.createUser(userForm)
      return this.success(res, 'Usuário criado com sucesso.', newUser, 201)
    } catch (err: any) {
      console.log(err)
      return this.error(res, err.message)
    }
  }
}
