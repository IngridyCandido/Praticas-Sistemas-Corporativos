"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const solicitacao_entity_1 = require("../solicitacoes/solicitacao.entity");
const auditoria_entity_1 = require("../auditoria/auditoria.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [solicitacao_entity_1.Solicitacao, auditoria_entity_1.Auditoria],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map