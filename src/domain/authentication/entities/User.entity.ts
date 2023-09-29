import { Company } from '../../company/entities/Company.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password?: string

  @Column()
  bio?: string

  @Column()
  mobile_phone?: string

  @Column()
  avatar_url?: string

  @Column()
  email_hash?: string

  @CreateDateColumn()
  created_at?: Date

  @Column()
  token!: string

  @Column()
  recovery_token?: string

  @Column()
  recovery_expiration_date?: Date

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company' })
  company!: Company
}
