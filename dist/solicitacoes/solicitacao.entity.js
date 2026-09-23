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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solicitacao = void 0;
const typeorm_1 = require("typeorm");
let Solicitacao = class Solicitacao {
    id;
    titulo;
    centroCusto;
    prioridade;
    status;
    versao;
    criadaEm;
    atualizadaEm;
};
exports.Solicitacao = Solicitacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Solicitacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Solicitacao.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'centro_custo', type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], Solicitacao.prototype, "centroCusto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, default: 'normal' }),
    __metadata("design:type", String)
], Solicitacao.prototype, "prioridade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pendente' }),
    __metadata("design:type", String)
], Solicitacao.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ name: 'versao' }),
    __metadata("design:type", Number)
], Solicitacao.prototype, "versao", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criada_em', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Solicitacao.prototype, "criadaEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizada_em', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Solicitacao.prototype, "atualizadaEm", void 0);
exports.Solicitacao = Solicitacao = __decorate([
    (0, typeorm_1.Entity)({ name: 'solicitacoes' })
], Solicitacao);
//# sourceMappingURL=solicitacao.entity.js.map