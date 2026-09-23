import { Module } from '@nestjs/common';
import { CentroCustoService } from './centro-custo.service';
import { CentroCustoController } from './centro-custo.controller';

@Module({
  providers: [CentroCustoService],
  controllers: [CentroCustoController]
})
export class CentroCustoModule {}
