import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from '../../../../domain/authentication/entities/User.entity'
import { Company } from '../../../../domain/company/entities/Company.entity'
import bcryptjs from 'bcryptjs'

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(User)
    const companyRepository = dataSource.getRepository(Company)
    const encryptedPassword = await bcryptjs.hash('admin', 10)
    const company = (await companyRepository.findOneBy({
      cnpj: '06.063.695/0001-37',
    })) as Company

    const user = new User()
    user.name = 'Admin BoxTi'
    user.email = 'admin@boxti.com.br'
    user.password = encryptedPassword
    user.company = company
    await userRepository.save(user)
  }
}
