export type StatusSolicitacao = 'pendente' | 'aprovada';
export type PrioridadeSolitacao = 'normal' | 'urgente';
export declare class Solicitacao {
    id: number;
    titulo: string;
    centroCusto: string;
    prioridade?: PrioridadeSolitacao;
    status: StatusSolicitacao;
    versao: number;
    criadaEm: Date;
    atualizadaEm: Date;
}
