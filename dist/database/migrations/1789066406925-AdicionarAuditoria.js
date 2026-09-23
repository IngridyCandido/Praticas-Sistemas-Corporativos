"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdicionarAuditoria1789066406925 = void 0;
class AdicionarAuditoria1789066406925 {
    name = 'AdicionarAuditoria1789066406925';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "auditorias" ("id" SERIAL NOT NULL, "ator_id" integer NOT NULL, "acao" character varying(50) NOT NULL, "recurso_tipo" character varying(50) NOT NULL, "recurso_id" integer NOT NULL, "detalhes" jsonb, "criada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b84b3505f313ab1a44e7b684ee2" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "auditorias"`);
    }
}
exports.AdicionarAuditoria1789066406925 = AdicionarAuditoria1789066406925;
//# sourceMappingURL=1789066406925-AdicionarAuditoria.js.map