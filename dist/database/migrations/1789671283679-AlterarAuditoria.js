"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterarAuditoria1789671283679 = void 0;
class AlterarAuditoria1789671283679 {
    name = 'AlterarAuditoria1789671283679';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "solicitacoes" ("id" SERIAL NOT NULL, "titulo" character varying(150) NOT NULL, "centro_custo" character varying(30) NOT NULL, "prioridade" character varying(10) NOT NULL DEFAULT 'normal', "status" character varying(20) NOT NULL DEFAULT 'pendente', "versao" integer NOT NULL, "criada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "atualizada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_795aaa33114295368cac771de45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auditorias" ("id" SERIAL NOT NULL, "ator_id" integer NOT NULL, "acao" character varying(50) NOT NULL, "motivo" character varying(200), "recurso_tipo" character varying(50) NOT NULL, "recurso_id" integer NOT NULL, "detalhes" jsonb, "criada_em" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b84b3505f313ab1a44e7b684ee2" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "auditorias"`);
        await queryRunner.query(`DROP TABLE "solicitacoes"`);
    }
}
exports.AlterarAuditoria1789671283679 = AlterarAuditoria1789671283679;
//# sourceMappingURL=1789671283679-AlterarAuditoria.js.map