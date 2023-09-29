import AppDataSource from '@infrastructure/database/mysql/AppDataSource'
import { injectable } from 'tsyringe'
import { Repository } from 'typeorm'
import { Company } from '../entities/Company.entity'
import ICompanyRepository from '../interfaces/ICompanyRepository'

@injectable()
export default class CompanyRepository implements ICompanyRepository {
  public companyRepository: Repository<Company>
  constructor() {
    this.companyRepository = AppDataSource.getRepository(Company)
  }

  async save(company: Company): Promise<Company> {
    return await this.companyRepository.save(company)
  }

  async findOneById(id: string): Promise<Company | null> {
    return await this.companyRepository.findOneBy({ id })
  }
}
