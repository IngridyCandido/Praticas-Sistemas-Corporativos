import { Injectable } from '@nestjs/common';

export type Papel = 'solicitante' | 'gestor' | 'auditor';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  papel: Papel;
  ativo: boolean;
};

export type UsuarioAutenticado = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
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
      senhaHash:'$2b$12$M2.V/TIq6fUawUkmPAObj.8XiJGDDkpWMcsKGa0Sn7Kkuumpkg0c.',
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

  buscarPorEmail(email: string) {
    return this.usuarios.find((usuario) => usuario.email === email);
  }
}