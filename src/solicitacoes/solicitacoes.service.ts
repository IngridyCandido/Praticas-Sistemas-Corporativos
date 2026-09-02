import { Injectable, NotFoundException } from '@nestjs/common';

type StatusSolicitacao = 'pendente' | 'aprovada';

type Solicitacao = {
  id: number;
  titulo: string;
  status: StatusSolicitacao;
};

@Injectable()
export class SolicitacoesService {
  private readonly solicitacoes: Solicitacao[] = [
    { id: 1, titulo: 'Aquisição de notebook', status: 'pendente' },
    { id: 2, titulo: 'Aquisição de projetor', status: 'pendente' },
    { id: 3, titulo: 'Aquisição de celular', status: 'aprovada' },
    { id: 4, titulo: 'Aquisição de mesa', status: 'pendente' }
  ];

  buscarPorId(id: number) {
    const solicitacao = this.solicitacoes.find((item) => item.id === id);

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    return solicitacao;
  }

  aprovar(id: number) {
    const solicitacao = this.buscarPorId(id);
    solicitacao.status = 'aprovada';
    return solicitacao;
  }
  
  relatorio() {
    const total = this.solicitacoes.length;
    const totalPendente = this.solicitacoes.filter(
      (solicitacao) => solicitacao.status === 'pendente'
    ).length;
    const totalAprovada = this.solicitacoes.filter(
      (solicitacao) => solicitacao.status === 'aprovada'
    ).length;

    return {
      total,
      totalPendente,
      totalAprovada
    };
  }

  buscarPorStatus(status: StatusSolicitacao) {
    return this.solicitacoes.find((solicitacao) => solicitacao.status === status);
  }
  
}