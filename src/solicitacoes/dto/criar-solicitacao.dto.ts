import { IsString, MaxLength, MinLength } from 'class-validator';
import type { PrioridadeSolitacao } from '../solicitacao.entity';

export class CriarSolicitacaoDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  titulo!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  centroCusto!: string;

  @IsString()
  @MaxLength(10)
  prioridade?: PrioridadeSolitacao;
}