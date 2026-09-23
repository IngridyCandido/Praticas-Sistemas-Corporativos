import { Injectable } from '@nestjs/common';

export type Papel = 'solicitante' | 'gestor' | 'auditor';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  papel: Papel;
  ativo: boolean;
}

export type UsuarioAutenticado = Omit<Usuario, "senhaHash">

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Ingridy',
      email: 'ingridy@empresa.com',
      senhaHash: '$2b$12$lBMyfsmGBx.SPOVgHCT4WOk9q9YBfYwepujIJ2kE/.6Nm1sN.asZO',
      papel: 'gestor',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Bruno Silva',
      email: 'bruno@empresa.com',
      senhaHash: '$2b$12$idSpkbR3GAZOAd.j.QRx6OCDaaoyOqiB7NwhEQHr34M5njnJnz8U6',
      papel: 'solicitante',
      ativo: true,
    },
    {
      id: 3,
      nome: 'Candido',
      email: 'candido@empresa.com',
      senhaHash: '$2b$12$EH6Q4ht3odPbZXO8VNoD7O8mC5Kb3Vm5tQSZC.9wk3C3rtwWupv.2',
      papel: 'auditor',
      ativo: true,
    },
  ];

  buscarPorEmail(email: string) {
    return this.usuarios.find(usuario => usuario.email === email);
  }
}
