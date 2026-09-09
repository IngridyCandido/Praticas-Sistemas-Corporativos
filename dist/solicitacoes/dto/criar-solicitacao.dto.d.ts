import type { PrioridadeSolitacao } from '../solicitacao.entity';
export declare class CriarSolicitacaoDto {
    titulo: string;
    centroCusto: string;
    prioridade?: PrioridadeSolitacao;
}
