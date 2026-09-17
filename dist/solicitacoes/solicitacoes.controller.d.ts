import { SolicitacoesService } from './solicitacoes.service';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { AprovarSolicitacaoDto } from './dto/aprovar-solicitacao.dto';
import { RejeitarSolicitacaoDto } from './dto/rejeitar-solicitacao.dto';
type RequisicaoAutenticada = {
    user: {
        id: number;
        papel: string;
    };
};
export declare class SolicitacoesController {
    private readonly solicitacoesService;
    constructor(solicitacoesService: SolicitacoesService);
    criar(dto: CriarSolicitacaoDto): Promise<import("./solicitacao.entity").Solicitacao>;
    listar(): Promise<import("./solicitacao.entity").Solicitacao[]>;
    buscarPorId(id: number): Promise<import("./solicitacao.entity").Solicitacao>;
    aprovar(id: number, dto: AprovarSolicitacaoDto, request: RequisicaoAutenticada): Promise<import("./solicitacao.entity").Solicitacao>;
    rejeitar(id: number, dto: RejeitarSolicitacaoDto, request: RequisicaoAutenticada): Promise<import("./solicitacao.entity").Solicitacao>;
}
export {};
