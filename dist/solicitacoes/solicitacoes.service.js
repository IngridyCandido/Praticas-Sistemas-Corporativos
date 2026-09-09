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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const solicitacao_entity_1 = require("./solicitacao.entity");
let SolicitacoesService = class SolicitacoesService {
    repository;
    constructor(repository) {
        this.repository = repository;
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
    async aprovar(id) {
        const solicitacao = await this.buscarPorId(id);
        solicitacao.status = 'aprovada';
        return this.repository.save(solicitacao);
    }
};
exports.SolicitacoesService = SolicitacoesService;
exports.SolicitacoesService = SolicitacoesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(solicitacao_entity_1.Solicitacao)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SolicitacoesService);
//# sourceMappingURL=solicitacoes.service.js.map