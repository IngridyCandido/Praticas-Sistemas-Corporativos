export declare class Auditoria {
    id: number;
    atorId: number;
    acao: string;
    motivo?: string | null;
    recursoTipo: string;
    recursoId: number;
    detalhes: Record<string, unknown> | null;
    criadaEm: Date;
}
