import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadoModule } from './estado/estado.module';
import { AuthModule } from './auth/auth.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';

@Module({
  imports: [AuthModule, EstadoModule, SolicitacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
