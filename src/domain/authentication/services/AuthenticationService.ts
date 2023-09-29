import { tokens } from '@di/tokens'
import { injectable, inject } from 'tsyringe'
import IAuthenticationService from '../interfaces/IAuthenticationService'
import IUserLogin from '@shared/interfaces/IUserLogin'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../entities/User.entity'
import ICreateUser from '../interfaces/ICreateUser'
import IUserRepository from '../interfaces/IUserRepository'
import IValidateNewUser from '../interfaces/IValidateNewUser'
import IUserFilters from '../interfaces/IUserListFilters'
import IUserListOrder from '../interfaces/IUserListOrder'
import IUser from '../interfaces/IUser'
import ICompanyService from '@domain/company/interfaces/ICompanyService'

@injectable()
export default class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject(tokens.UserRepository) private userRepository: IUserRepository,
    @inject(tokens.CompanyService) private companyService: ICompanyService
  ) {}

  async createUser(newUser: ICreateUser): Promise<User> {
    const userRepository = await this.userRepository.getRepository()
    const { name, email, password } = newUser

    const encryptedPassword = await bcryptjs.hash(password, 10)

    const company = await this.companyService.create({
      name: `${name}'s company`,
    })

    const user: User = await userRepository.save({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      company,
    })

    const token_key = process.env.TOKEN_KEY

    if (!token_key) {
      throw new Error('TOKEN_KEY was not defined in .env')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        company_id: user.company.id,
        created_at: user.created_at,
      },
      token_key,
      {
        expiresIn: '2h',
      }
    )

    user.token = token
    delete user.password
    delete user.created_at

    return user
  }

  async validateNewUser(newUser: ICreateUser): Promise<IValidateNewUser> {
    const userRepository = await this.userRepository.getRepository()
    const oldUser = await userRepository.findOneBy({ email: newUser.email })

    if (oldUser) {
      return { status: false, error: 'User Already Exist. Please Login' }
    }

    return { status: true }
  }

  async passwordReset(email: string): Promise<boolean> {
    const userRepository = await this.userRepository.getRepository()
    const userFound = await userRepository.findOneBy({ email })

    if (userFound) {
      const token = email + '_USER_TOKEN_'
      const hashedToken = await bcryptjs.hash(token, 10)
      await this.userRepository.updateTokenPasswordReset(
        userFound.id,
        hashedToken
      )
    }

    // WE'LL AWAYS SHOW AS TRUE...
    const passwordResetResponse = true
    return passwordResetResponse
  }

  async login(userLogin: IUserLogin): Promise<User | void> {
    const userRepository = await this.userRepository.getRepository()

    const user = await userRepository.findOne({
      where: { email: userLogin.email },
      relations: { company: true },
    })

    if (!user) {
      throw new Error('Unauthenticated user')
    }

    if (userLogin.password == undefined || user.password == undefined) {
      console.log(user)
    }

    const userAuthenticated =
      user &&
      (await bcryptjs.compare(userLogin.password, user.password as string))

    if (!userAuthenticated) {
      throw new Error('Unauthenticated user')
    }

    const token_key = process.env.TOKEN_KEY

    if (!token_key) {
      throw new Error('TOKEN_KEY was not defined in .env')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        company_id: user.company.id,
        created_at: user.created_at,
      },
      token_key,
      {
        expiresIn: '2h',
      }
    )

    user.token = token
    delete user.password
    delete user.created_at

    return user
  }

  async getUser(user_id: string): Promise<User | null> {
    return await this.userRepository.findOneById(user_id)
  }

  async getUsers(
    ids: Array<string>,
    company_id: string
  ): Promise<User[] | null> {
    return await this.userRepository.findManyByIdAndCompany(ids, company_id)
  }

  async listUsersByCompanyWithPagination(
    company_id: string,
    page: number,
    filters: IUserFilters = {},
    order: IUserListOrder = {},
    per_page?: number
  ): Promise<{
    users?: IUser[] | []
    totalPages?: number
    totalItems?: number
  }> {
    const { users, totalItems, totalPages } =
      await this.userRepository.listByCompanyWithPagination(
        company_id,
        page,
        filters,
        order,
        per_page
      )

    return {
      users,
      totalItems,
      totalPages,
    }
  }

  async updateUser(id: string, user: IUser): Promise<User | null> {
    return await this.userRepository.update(id, user)
  }

  async updatePassword(id: string, password: string): Promise<boolean> {
    const encryptedPassword = await bcryptjs.hash(password, 10)

    const updatePasswordResponse = await this.userRepository.updatePassword(
      id,
      encryptedPassword
    )

    return updatePasswordResponse
  }
}
