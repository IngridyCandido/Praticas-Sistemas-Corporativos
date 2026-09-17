export type StatusSolicitacao = 'pendente' | 'aprovada' | 'rejeitada';
export type PrioridadeSolicitacao = 'normal' | 'urgente';
export declare class Solicitacao {
    id: number;
    titulo: string;
    centroCusto: string;
    prioridade: PrioridadeSolicitacao;
    status: StatusSolicitacao;
    versao: number;
    criadaEm: Date;
    atualizadaEm: Date;
}
