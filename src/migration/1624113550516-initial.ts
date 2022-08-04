import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1624113550516 implements MigrationInterface {
    name = 'initial1624113550516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_status_enum" AS ENUM('active', 'deactive')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "user_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "user_status_enum"`);
    }

}
