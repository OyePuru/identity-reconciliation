import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Contact1719609609955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contact",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "phoneNumber",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "linkedId",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "linkPrecedence",
                    type: "enum",
                    enum: ["primary", "secondary"]
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }));

        await queryRunner.createForeignKey("contact", new TableForeignKey({
            columnNames: ["linkedId"],
            referencedColumnNames: ["id"],
            referencedTableName: "contact",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("contact");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("linkedId") !== -1);
        await queryRunner.dropForeignKey("contact", foreignKey);
        await queryRunner.dropTable("contact");
    }

}
