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
      nome: 'Ana Lima',
      email: 'ana@empresa.com',
      senhaHash: '$2b$12$WTrDF9VW7Eru2yDjgA9ssevHGyM4JcOGcVVskk1wfxEE9FNBvH1Ve',
      papel: 'gestor',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Bruno Silva',
      email: 'bruno@empresa.com',
      senhaHash:
        '$2b$12$ixl5hGnz6r27XkUQmZw0AeEWvk.BgnEu/K7aA2pKIowRJRj5xJ8B.',
      papel: 'solicitante',
      ativo: true,
    },
    {
      id: 3,
      nome: 'Carla Souza',
      email: 'carla@empresa.com',
      senhaHash: '$2b$12$OKbhDE5.jvLNkVDEJqYJaOLkKStxDFBrhNmnLrQm1lWgNZFZ2tXWi',
      papel: 'auditor',
      ativo: true,
    },
  ];

  buscarPorEmail(email: string) {
    return this.usuarios.find((usuario) => usuario.email === email);
  }
}