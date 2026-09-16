import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { Solicitacao } from './solicitacao.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Auditoria } from '../auditoria/auditoria.entity';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly repository: Repository<Solicitacao>,
    private readonly dataSource: DataSource,
  ) {}

  listar() {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  async buscarPorId(id: number) {
    const solicitacao = await this.repository.findOneBy({ id });
    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    return solicitacao;
  }

  criar(dto: CriarSolicitacaoDto) {
    const solicitacao = this.repository.create({
      titulo: dto.titulo,
      status: 'pendente',
    });
    return this.repository.save(solicitacao);
  }

  async aprovar(id: number, versaoEsperada: number, atorId: number) {
  return this.dataSource.transaction(async (manager) => {
    const solicitacao = await manager.findOneBy(Solicitacao, { id });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    if (solicitacao.status !== 'pendente') {
      throw new ConflictException('Solicitação não está pendente');
    }

    const resultado = await manager
      .createQueryBuilder()
      .update(Solicitacao)
      .set({ status: 'aprovada', versao: () => 'versao + 1' })
      .where('id = :id', { id })
      .andWhere('versao = :versao', { versao: versaoEsperada })
      .andWhere('status = :status', { status: 'pendente' })
      .execute();

    if (resultado.affected !== 1) {
      throw new ConflictException(
        'A solicitação foi alterada; consulte novamente',
      );
    }

    await manager.insert(Auditoria, {
      atorId,
      acao: 'SOLICITACAO_APROVADA',
      recursoTipo: 'solicitacao',
      recursoId: id,
      detalhes: {
        statusAnterior: 'pendente',
        statusAtual: 'aprovada',
        versaoAnterior: versaoEsperada,
      },
    });

    return manager.findOneByOrFail(Solicitacao, { id });
  });
  }
}