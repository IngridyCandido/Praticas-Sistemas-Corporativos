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
exports.Auditoria = void 0;
const typeorm_1 = require("typeorm");
let Auditoria = class Auditoria {
    id;
    atorId;
    acao;
    recursoTipo;
    recursoId;
    detalhes;
    criadaEm;
};
exports.Auditoria = Auditoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Auditoria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ator_id', type: 'int' }),
    __metadata("design:type", Number)
], Auditoria.prototype, "atorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Auditoria.prototype, "acao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recurso_tipo', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Auditoria.prototype, "recursoTipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recurso_id', type: 'int' }),
    __metadata("design:type", Number)
], Auditoria.prototype, "recursoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Auditoria.prototype, "detalhes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criada_em', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Auditoria.prototype, "criadaEm", void 0);
exports.Auditoria = Auditoria = __decorate([
    (0, typeorm_1.Entity)({ name: 'auditorias' })
], Auditoria);
//# sourceMappingURL=auditoria.entity.js.map