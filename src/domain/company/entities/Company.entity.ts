import { User } from '../../authentication/entities/User.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  cnpj?: string

  @Column()
  size?: string

  @Column()
  city?: string

  @Column()
  state?: string

  @Column()
  area?: string

  @CreateDateColumn()
  created_at!: Date

  @OneToMany(() => User, (user) => user.company)
  users!: User[]
}
