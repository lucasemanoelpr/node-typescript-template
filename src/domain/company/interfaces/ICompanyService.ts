import { Company } from '../entities/Company.entity'
import ICreateCompany from './ICreateCompany'

export default interface ICompanyService {
  findOneById(id: string): Promise<Company | null>
  create(company: ICreateCompany): Promise<Company>
  update(id: string, company: ICreateCompany): Promise<Company>
}
