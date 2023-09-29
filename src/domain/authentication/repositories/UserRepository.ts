import { injectable } from 'tsyringe'
import bcryptjs from 'bcryptjs'
import { Repository, SelectQueryBuilder } from 'typeorm'
import md5 from 'md5'

import AppDataSource from '@infrastructure/database/mysql/AppDataSource'
import { User } from '../entities/User.entity'
import IUserRepository from '../interfaces/IUserRepository'
import IUserListFilters from '../interfaces/IUserListFilters'
import IUserListOrder from '../interfaces/IUserListOrder'
import IUser from '../interfaces/IUser'

@injectable()
export default class UserRepository implements IUserRepository {
  public userRepository: Repository<User>
  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  async getRepository(): Promise<Repository<User>> {
    return this.userRepository
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('id = :id', { id })
      .getOne()
  }

  async findManyByIdAndCompany(
    ids: Array<string>,
    company_id: string
  ): Promise<User[] | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.email_hash',
        'user.mobile_phone',
        'user.bio',
        'user.avatar_url',
      ])
      .where('id IN (:ids)', { ids })
      .andWhere('company = :company_id', { company_id })
      .getMany()
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('email = :email', { email })
      .getOne()
  }

  async listByCompanyWithPagination(
    company: string,
    page = 1,
    filters: IUserListFilters = {},
    order: IUserListOrder = {},
    per_page: number
  ): Promise<{
    users?: IUser[]
    totalPages?: number
    totalItems?: number
  }> {
    const query = this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.email_hash',
        'user.mobile_phone',
        'user.bio',
        'user.avatar_url',
      ])
      .leftJoin('user.team', 'team')
      .addSelect(['team.id', 'team.name'])
      .where('user.company = :company', { company })

    if (order.order_by) {
      const [order_field, order_direction = 'ASC'] = order.order_by.split(' ')
      query.orderBy(order_field, order_direction as 'ASC' | 'DESC')
    }

    const queryWithFilters = this.addFilters(query, filters)

    const [users, totalItems] = await queryWithFilters
      .skip((page - 1) * per_page)
      .take(per_page)
      .getManyAndCount()

    const totalPages = Math.ceil(totalItems / per_page)

    return { users, totalPages, totalItems }
  }

  private addFilters(
    query: SelectQueryBuilder<any>,
    filters: IUserListFilters = {}
  ) {
    if (filters.name) {
      query.andWhere('user.name like :name', {
        name: `%${filters.name}%`,
      })
    }

    return query
  }

  async save(user: IUser): Promise<User> {
    const userToSave = new User()
    userToSave.name = user.name
    userToSave.email = user.email.toLowerCase()
    userToSave.email_hash = md5(user.email.toLowerCase())
    userToSave.password = await bcryptjs.hash(user.password, 10)
    userToSave.bio = user.bio
    userToSave.avatar_url = user.avatar_url
    userToSave.company = user.company

    return await this.userRepository.save(userToSave)
  }

  async update(id: string, user: IUser): Promise<User | null> {
    const userToUpdate = await this.findOneById(id)

    if (userToUpdate === null) {
      return null
    }

    for (const [key, value] of Object.entries(user)) {
      ;(userToUpdate as any)[key] = value
    }

    return await this.userRepository.save(userToUpdate)
  }

  async updatePassword(id: string, password: string): Promise<boolean> {
    const responseUpdatePassword = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: password })
      .where('id = :id', { id })
      .execute()

    if (responseUpdatePassword.affected) {
      return true
    } else {
      return false
    }
  }

  async updateTokenPasswordReset(id: string, token: string): Promise<boolean> {
    const responseUpdatePassword = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ recovery_token: token, recovery_expiration_date: () => 'now()' })
      .where('id = :id', { id })
      .execute()

    if (responseUpdatePassword.affected) {
      return true
    } else {
      return false
    }
  }
}
