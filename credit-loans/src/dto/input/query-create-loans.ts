import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QueryLoansInputDTO {
  @ApiPropertyOptional({
    description: 'Страница',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return 5;
    }
    return value;
  })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  PageInfo: number = 5;

  @ApiPropertyOptional({
    description: 'Кол-во кредитных ставок',
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
  LoansQuantity: number = 3;
}
