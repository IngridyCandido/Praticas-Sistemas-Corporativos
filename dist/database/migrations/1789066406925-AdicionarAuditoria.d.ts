import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AdicionarAuditoria1789066406925 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
