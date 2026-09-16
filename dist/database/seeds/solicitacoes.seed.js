"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const data_source_1 = __importDefault(require("../data-source"));
const solicitacao_entity_1 = require("../../solicitacoes/solicitacao.entity");
const dados = [
    {
        titulo: 'Aquisição de monitor',
        centroCusto: 'TI-DEV',
        prioridade: 'normal',
    },
    {
        titulo: 'Substituição de servidor',
        centroCusto: 'TI-INFRA',
        prioridade: 'urgente',
    },
];
async function executar() {
    await data_source_1.default.initialize();
    const repository = data_source_1.default.getRepository(solicitacao_entity_1.Solicitacao);
    for (const item of dados) {
        const existente = await repository.findOneBy({ titulo: item.titulo });
        if (!existente) {
            await repository.save(repository.create({
                ...item,
                status: 'pendente',
            }));
        }
    }
    await data_source_1.default.destroy();
}
executar().catch(async (erro) => {
    console.error(erro);
    if (data_source_1.default.isInitialized) {
        await data_source_1.default.destroy();
    }
    process.exitCode = 1;
});
//# sourceMappingURL=solicitacoes.seed.js.map