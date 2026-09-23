import { Solicitacao } from './solicitacao.entity';
import { SolicitacoesService } from './solicitacoes.service';
import { Auditoria } from '../auditoria/auditoria.entity';
import { vi } from 'vitest';

describe('SolicitacoesService', () => {
  let service: SolicitacoesService;

  const solicitacao = {
    id: 10,
    titulo: 'Teste de rollback',
    centroCusto: 'TI-DEV',
    prioridade: 'normal',
    status: 'pendente',
    versao: 1,
  } as Solicitacao;

  const manager = {
    findOneBy: vi.fn(),
    createQueryBuilder: vi.fn(),
    insert: vi.fn(),
    findOneByOrFail: vi.fn(),
  };

  const dataSource = {
    transaction: vi.fn(),
  };

  const repository = {
    find: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    count: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    service = new SolicitacoesService(
      repository as any,
      dataSource as any,
    );
  });

  it('deve fazer rollback quando a auditoria falhar', async () => {
    const execute = vi.fn().mockResolvedValue({
      affected: 1,
    });

    const queryBuilder = {
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      andWhere: vi.fn().mockReturnThis(),
      execute,
    };

    manager.findOneBy.mockResolvedValue(solicitacao);
    manager.createQueryBuilder.mockReturnValue(queryBuilder);

    manager.insert.mockRejectedValue(
      new Error('Falha simulada ao registrar auditoria'),
    );

    dataSource.transaction.mockImplementation(
      async (callback: (manager: any) => Promise<unknown>) => {
        return callback(manager);
      },
    );

    await expect(
      service.rejeitar(
        solicitacao.id,
        solicitacao.versao,
        'Solicitação rejeitada para teste de rollback.',
        1,
      ),
    ).rejects.toThrow('Falha simulada ao registrar auditoria');

    expect(execute).toHaveBeenCalledTimes(1);

    expect(manager.insert).toHaveBeenCalledWith(
      Auditoria,
      expect.objectContaining({
        acao: 'SOLICITACAO_REJEITADA',
        recursoTipo: 'solicitacao',
        recursoId: solicitacao.id,
        atorId: 1,
        detalhes: expect.objectContaining({
          statusAnterior: 'pendente',
          statusAtual: 'rejeitada',
          versaoAnterior: 1,
          justificativa:
            'Solicitação rejeitada para teste de rollback.',
        }),
      }),
    );

    expect(dataSource.transaction).toHaveBeenCalledTimes(1);
  });
});