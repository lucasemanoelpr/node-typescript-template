import { Company } from '../entities/Company.entity'

export default interface ICompanyRepository {
  save(company: Company): Promise<Company>
  findOneById(id: string): Promise<Company | null>
}
