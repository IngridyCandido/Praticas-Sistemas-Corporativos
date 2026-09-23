import { IsInt, Min, MaxLength, MinLength, IsString } from 'class-validator';

export class RejeitarSolicitacaoDto {
  @IsInt()
  @Min(1)
  versao!:number;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  motivo!:string;
}