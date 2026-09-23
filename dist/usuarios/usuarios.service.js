"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
let UsuariosService = class UsuariosService {
    usuarios = [
        {
            id: 1,
            nome: 'Ingridy',
            email: 'ingridy@empresa.com',
            senhaHash: '$2b$12$FDi5jVZIuXug2wYGc/1Z5.p79CZuZPVjnBEDYTmKR6VTbjI.stsvy',
            papel: 'gestor',
            ativo: true,
        },
        {
            id: 2,
            nome: 'Bruno Silva',
            email: 'bruno@empresa.com',
            senhaHash: '$2b$12$M2.V/TIq6fUawUkmPAObj.8XiJGDDkpWMcsKGa0Sn7Kkuumpkg0c.',
            papel: 'solicitante',
            ativo: true,
        },
        {
            id: 3,
            nome: 'Candido',
            email: 'candido@empresa.com',
            senhaHash: '$2b$12$Alf/PYjU2gxwLPGmUO52xufTGwkLxwUxml7X/4zMrAIaiR.FBZ9Pu',
            papel: 'auditor',
            ativo: true,
        },
    ];
    buscarPorEmail(email) {
        return this.usuarios.find((usuario) => usuario.email === email);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)()
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map