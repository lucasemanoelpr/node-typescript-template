import { tokens } from '@di/tokens'
import { inject, injectable } from 'tsyringe'
import { Company } from '../entities/Company.entity'
import ICompanyRepository from '../interfaces/ICompanyRepository'
import ICompanyService from '../interfaces/ICompanyService'
import ICreateCompany from '../interfaces/ICreateCompany'
import IUpdateCompany from '../interfaces/IUpdateCompany'

@injectable()
export default class CompanyService implements ICompanyService {
  constructor(
    @inject(tokens.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async findOneById(id: string): Promise<Company | null> {
    return await this.companyRepository.findOneById(id)
  }

  async create(company: ICreateCompany): Promise<Company> {
    const newCompany = new Company()
    newCompany.name = company.name
    newCompany.size = company.size
    newCompany.cnpj = company.cnpj
    newCompany.city = company.name
    newCompany.state = company.state
    newCompany.area = company.area
    return await this.companyRepository.save(newCompany)
  }

  async update(id: string, company: IUpdateCompany): Promise<Company> {
    const oldCompany = (await this.companyRepository.findOneById(id)) as Company
    oldCompany.name = company.name
    oldCompany.size = company.size
    oldCompany.cnpj = company.cnpj
    oldCompany.city = company.city
    oldCompany.state = company.state
    oldCompany.area = company.area

    return await this.companyRepository.save(oldCompany)
  }
}
