import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Solicitações (e2e)', () => {
  let app: INestApplication<App>;

  let tokenGestor: string;
  let tokenSolicitante: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    const loginGestor = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ingridy@empresa.com',
        senha: '20251038060006',
      })
      .expect(201);

    tokenGestor = loginGestor.body.accessToken;

    const loginSolicitante = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'bruno@empresa.com',
        senha: '123456',
      })
      .expect(201);

    tokenSolicitante = loginSolicitante.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve permitir que o gestor consulte o relatório', async () => {
    const response = await request(app.getHttpServer())
      .get('/solicitacoes/relatorio')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .expect(200);

    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('totalPendente');
    expect(response.body).toHaveProperty('totalAprovada');
    expect(response.body).toHaveProperty('totalRejeitada');
  });

  it('deve rejeitar uma solicitação pendente como gestor', async () => {
    const criacao = await request(app.getHttpServer())
      .post('/solicitacoes')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        titulo: 'Solicitação E2E para rejeição',
        centroCusto: 'TI-TESTE',
        prioridade: 'normal',
      })
      .expect(201);

    const solicitacao = criacao.body;

    expect(solicitacao.status).toBe('pendente');
    expect(solicitacao.versao).toBe(1);

    const rejeicao = await request(app.getHttpServer())
      .patch(`/solicitacoes/${solicitacao.id}/rejeitar`)
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        versao: 1,
        justificativa: 'Solicitação rejeitada pelo teste E2E.',
      })
      .expect(200);

    expect(rejeicao.body.status).toBe('rejeitada');
    expect(rejeicao.body.versao).toBe(2);
  });

  it('deve retornar 400 quando a justificativa for inválida', async () => {
    const criacao = await request(app.getHttpServer())
      .post('/solicitacoes')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        titulo: 'Solicitação E2E justificativa',
        centroCusto: 'TI-TESTE',
        prioridade: 'normal',
      })
      .expect(201);

    await request(app.getHttpServer())
      .patch(`/solicitacoes/${criacao.body.id}/rejeitar`)
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        versao: criacao.body.versao,
        justificativa: 'teste',
      })
      .expect(400);
  });

  it('deve retornar 401 sem token', async () => {
    await request(app.getHttpServer())
      .patch('/solicitacoes/1/rejeitar')
      .send({
        versao: 1,
        justificativa: 'Tentativa sem autenticação.',
      })
      .expect(401);
  });

  it('deve retornar 403 para um usuário sem papel de gestor', async () => {
    const criacao = await request(app.getHttpServer())
      .post('/solicitacoes')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        titulo: 'Solicitação E2E autorização',
        centroCusto: 'TI-TESTE',
        prioridade: 'normal',
      })
      .expect(201);

    await request(app.getHttpServer())
      .patch(`/solicitacoes/${criacao.body.id}/rejeitar`)
      .set('Authorization', `Bearer ${tokenSolicitante}`)
      .send({
        versao: criacao.body.versao,
        justificativa: 'Tentativa de rejeição sem permissão.',
      })
      .expect(403);
  });

  it('deve retornar 404 para uma solicitação inexistente', async () => {
    await request(app.getHttpServer())
      .patch('/solicitacoes/999999/rejeitar')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        versao: 1,
        justificativa: 'Solicitação que não existe.',
      })
      .expect(404);
  });

  it('deve retornar 409 quando a versão estiver desatualizada', async () => {
    const criacao = await request(app.getHttpServer())
      .post('/solicitacoes')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        titulo: 'Solicitação E2E versão',
        centroCusto: 'TI-TESTE',
        prioridade: 'normal',
      })
      .expect(201);

    await request(app.getHttpServer())
      .patch(`/solicitacoes/${criacao.body.id}/rejeitar`)
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        versao: 999,
        justificativa: 'Tentativa usando uma versão antiga.',
      })
      .expect(409);
  });

  it('deve retornar 409 ao tentar rejeitar uma solicitação já rejeitada', async () => {
    const criacao = await request(app.getHttpServer())
      .post('/solicitacoes')
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        titulo: 'Solicitação E2E conflito',
        centroCusto: 'TI-TESTE',
        prioridade: 'normal',
      })
      .expect(201);

    await request(app.getHttpServer())
      .patch(`/solicitacoes/${criacao.body.id}/rejeitar`)
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        versao: criacao.body.versao,
        justificativa: 'Primeira rejeição válida.',
      })
      .expect(200);

    await request(app.getHttpServer())
      .patch(`/solicitacoes/${criacao.body.id}/rejeitar`)
      .set('Authorization', `Bearer ${tokenGestor}`)
      .send({
        versao: 2,
        justificativa: 'Segunda rejeição inválida.',
      })
      .expect(409);
  });
});