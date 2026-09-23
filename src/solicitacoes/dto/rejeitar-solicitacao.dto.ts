import { IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class RejeitarSolicitacaoDto {
  @IsInt()
  @Min(1)
  versao: number;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  justificativa: string;
}