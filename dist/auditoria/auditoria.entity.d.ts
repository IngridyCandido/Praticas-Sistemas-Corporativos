export declare class Auditoria {
    id: number;
    atorId: number;
    acao: string;
    recursoTipo: string;
    recursoId: number;
    detalhes: Record<string, unknown> | null;
    criadaEm: Date;
}
