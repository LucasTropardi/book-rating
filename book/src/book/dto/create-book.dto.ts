/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  autor: string;

  @IsNumber()
  anoLancamento: number;

  @IsNumber()
  qtdPaginas: number;

  @IsNotEmpty()
  sinopse: string;

  @IsOptional()
  imagem?: string;
}
