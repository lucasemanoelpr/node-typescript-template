import IUserLogin from '@shared/interfaces/IUserLogin'
import { User } from '../entities/User.entity'
import ICreateUser from './ICreateUser'
import IUserListFilters from './IUserListFilters'
import IUserListOrder from './IUserListOrder'
import IValidateNewUser from './IValidateNewUser'
import IUser from './IUser'

export default interface IAuthenticationService {
  createUser(newUser: ICreateUser): Promise<User>
  login(userLogin: IUserLogin): Promise<User | void>
  validateNewUser(newUser: ICreateUser): Promise<IValidateNewUser>
  getUser(id: string): Promise<User | null>
  passwordReset(email: string): Promise<boolean>
  getUsers(ids: Array<string>, company_id: string): Promise<User[] | null>
  updateUser(id: string, user: Partial<IUser>): Promise<User | null>
  updatePassword(id: string, password: string): Promise<boolean>
  listUsersByCompanyWithPagination(
    company_id: string,
    page: number,
    filters?: IUserListFilters,
    order?: IUserListOrder,
    per_page?: number
  ): Promise<{
    users?: IUser[]
    totalPages?: number
    totalItems?: number
  }>
}
