import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Company } from '../../../../domain/company/entities/Company.entity'

export default class CompanySeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
    const companyRepository = dataSource.getRepository(Company)

    const company = new Company()
    company.name = 'BoxTi'
    company.size = 'Pequena'
    company.city = 'Joinville'
    company.state = 'Santa Catarina'
    company.area = 'Tech Strategy'
    company.cnpj = '06.063.695/0001-37'
    await companyRepository.save(company)
  }
}
