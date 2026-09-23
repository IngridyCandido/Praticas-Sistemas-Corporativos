import { UsuarioAutenticado } from '../usuarios/usuarios.service';
import { AuthService } from './auth.service';
type RequisicaoAutenticada = {
    user: UsuarioAutenticado;
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: RequisicaoAutenticada): {
        accessToken: string;
    };
    perfil(request: {
        user: RequisicaoAutenticada;
    }): {
        usuario: RequisicaoAutenticada;
    };
}
export {};
