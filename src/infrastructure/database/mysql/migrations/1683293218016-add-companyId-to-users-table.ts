import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddCompanyIdToUsersTable1683293218016
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'company',
        type: 'varchar',
        generationStrategy: 'uuid',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['company'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'company')
    await queryRunner.dropForeignKey('user', 'company')
  }
}
