import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AlterarAuditoria1789671283679 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
