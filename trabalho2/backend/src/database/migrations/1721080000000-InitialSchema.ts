import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1721080000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'varchar', length: '100' },
          { name: 'email', type: 'varchar', length: '160', isUnique: true },
          { name: 'password_hash', type: 'varchar', length: '255' },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'contents',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', length: '180' },
          { name: 'text', type: 'text' },
          { name: 'image', type: 'varchar', length: '1000' },
          { name: 'display_order', type: 'int', default: 0 },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [{ name: 'IDX_contents_display_order', columnNames: ['display_order'] }],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contents');
    await queryRunner.dropTable('users');
  }
}
