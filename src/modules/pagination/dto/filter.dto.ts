import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export const DEFAULT_PAGE_SIZE = 10;

export class FilterDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'O atributo página deve ser um número' })
  page: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'O page size deve ser um número' })
  pageSize: number = DEFAULT_PAGE_SIZE;
}
