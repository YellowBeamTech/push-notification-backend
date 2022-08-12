import {MigrationInterface, QueryRunner} from "typeorm";
import { hashPassword } from "../utils/authentication_manager";

export class addDefaultAdminUser1660285604002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //super admin user : email = superuser1@mailinator.com,  password = 12345678
      const encrypted_pass = await hashPassword('12345678')

        await queryRunner.query(`INSERT INTO "user"("id", "firstName", "lastName", "email", "password", "phone_no", "status",
         "is_admin", "notification_limit", "social_login", "social_token", "package_id", "device_registration_token",
        "reset_token", "is_deleted", "created_at", "updated_at", "deleted_at")
        VALUES (DEFAULT, 'super', 'user', 'superuser1@mailinator.com', $1, '123456789', 'active', true , DEFAULT, DEFAULT,
        DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT) 
        RETURNING "id", "status", "is_admin", "is_deleted", "created_at", "updated_at", "deleted_at" 
        `,[encrypted_pass])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
