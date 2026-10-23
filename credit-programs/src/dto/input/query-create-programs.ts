import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class QueryProgramsInputDTO {
  @ApiPropertyOptional({
    description: 'Страница',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return 1;
    }
    return value;
  })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  PageInfo: number = 1;

  @ApiPropertyOptional({
    description: 'Кол-во кредитных программ',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return 3;
    }
    return value;
  })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  ProgramsQuantity: number = 3;
}
