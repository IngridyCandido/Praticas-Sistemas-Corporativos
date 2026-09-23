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
export declare class UsuariosService {
    private readonly usuarios;
    buscarPorEmail(email: string): Usuario | undefined;
}
