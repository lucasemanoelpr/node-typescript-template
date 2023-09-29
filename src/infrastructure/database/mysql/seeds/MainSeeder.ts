import { DataSource } from 'typeorm'
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension'
import CompanySeeder from './CompanySeeder'
import UserSeeder from './UserSeeder'


export default class MainSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
    await runSeeder(dataSource, CompanySeeder)
    await runSeeder(dataSource, UserSeeder)
  }
}
