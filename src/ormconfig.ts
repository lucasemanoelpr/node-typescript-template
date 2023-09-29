import 'reflect-metadata'
import { DataSourceOptions } from 'typeorm'
import dotenv from 'dotenv'
import { SeederOptions } from 'typeorm-extension'
import MainSeeder from './infrastructure/database/mysql/seeds/MainSeeder'

dotenv.config()

export default {
  type: 'mysql',
  extra: {
    socketPath: process.env.DB_CONFIG_SOCKET,
  },
  host: process.env.DB_CONFIG_HOST,
  database: process.env.DB_CONFIG_DATABASE,
  port: process.env.DB_CONFIG_PORT,
  username: process.env.DB_CONFIG_USERNAME,
  password: process.env.DB_CONFIG_PASSWORD,
  synchronize: false,
  dropSchema: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [
    __dirname + '/infrastructure/database/mysql/migrations/*{.ts,.js}',
  ],
  cli: {
    migrationsDir: __dirname + '/infrastructure/database/mysql/migrations',
  },
  seeds: [MainSeeder],
} as DataSourceOptions & SeederOptions
