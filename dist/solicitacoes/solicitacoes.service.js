"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitacoesService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const solicitacao_entity_1 = require("./solicitacao.entity");
const common_1 = require("@nestjs/common");
const typeorm_3 = require("typeorm");
const auditoria_entity_1 = require("../auditoria/auditoria.entity");
let SolicitacoesService = class SolicitacoesService {
    repository;
    dataSource;
    constructor(repository, dataSource) {
        this.repository = repository;
        this.dataSource = dataSource;
    }
    listar() {
        return this.repository.find({ order: { id: 'ASC' } });
    }
    async buscarPorId(id) {
        const solicitacao = await this.repository.findOneBy({ id });
        if (!solicitacao) {
            throw new common_1.NotFoundException('Solicitação não encontrada');
        }
        return solicitacao;
    }
    criar(dto) {
        const solicitacao = this.repository.create({
            titulo: dto.titulo,
            status: 'pendente',
        });
        return this.repository.save(solicitacao);
    }
    async aprovar(id, versaoEsperada, atorId) {
        return this.dataSource.transaction(async (manager) => {
            const solicitacao = await manager.findOneBy(solicitacao_entity_1.Solicitacao, { id });
            if (!solicitacao) {
                throw new common_1.NotFoundException('Solicitação não encontrada');
            }
            if (solicitacao.status !== 'pendente') {
                throw new common_1.ConflictException('Solicitação não está pendente');
            }
            const resultado = await manager
                .createQueryBuilder()
                .update(solicitacao_entity_1.Solicitacao)
                .set({ status: 'aprovada', versao: () => 'versao + 1' })
                .where('id = :id', { id })
                .andWhere('versao = :versao', { versao: versaoEsperada })
                .andWhere('status = :status', { status: 'pendente' })
                .execute();
            if (resultado.affected !== 1) {
                throw new common_1.ConflictException('A solicitação foi alterada; consulte novamente');
            }
            await manager.insert(auditoria_entity_1.Auditoria, {
                atorId,
                acao: 'SOLICITACAO_APROVADA',
                recursoTipo: 'solicitacao',
                recursoId: id,
                detalhes: {
                    statusAnterior: 'pendente',
                    statusAtual: 'aprovada',
                    versaoAnterior: versaoEsperada,
                },
            });
            return manager.findOneByOrFail(solicitacao_entity_1.Solicitacao, { id });
        });
    }
};
exports.SolicitacoesService = SolicitacoesService;
exports.SolicitacoesService = SolicitacoesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(solicitacao_entity_1.Solicitacao)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_3.DataSource])
], SolicitacoesService);
//# sourceMappingURL=solicitacoes.service.js.map