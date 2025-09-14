import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExchangeRateEntity1700000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'exchange_rate',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'createdAtUtc',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'version',
                        type: 'int',
                        default: 1,
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        precision: 10,
                        scale: 4,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        length: '10',
                    },
                    {
                        name: 'rate',
                        type: 'decimal',
                        precision: 10,
                        scale: 4,
                    },
                    {
                        name: 'fetchedAt',
                        type: 'timestamptz',
                    },
                ],
            }),
            true,
        );

        await queryRunner.query(
            'CREATE INDEX "IDX_exchange_rate_fetched_at" ON "exchange_rate" ("fetchedAt")',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('exchange_rate');
    }
}
