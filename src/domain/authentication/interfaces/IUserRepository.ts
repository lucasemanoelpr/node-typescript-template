import { Repository } from 'typeorm'
import { User } from '../entities/User.entity'
import IUserFilters from './IUserListFilters'
import IUserListOrder from './IUserListOrder'
import IUser from './IUser'

export default interface IUserRepository {
  getRepository(): Promise<Repository<User>>
  update(id: string, user: Partial<IUser>): Promise<User | null>
  updatePassword(id: string, password: string): Promise<boolean>
  findOneById(id: string): Promise<User | null>
  findManyByIdAndCompany(
    ids: Array<string>,
    company_id: string
  ): Promise<User[] | null>
  listByCompanyWithPagination(
    company_id: string,
    page?: number,
    filters?: IUserFilters,
    order?: IUserListOrder,
    perPage?: number
  ): Promise<{
    users?: IUser[]
    totalPages?: number
    totalItems?: number
  }>
  updateTokenPasswordReset(id: string, token: string): Promise<boolean>
}
