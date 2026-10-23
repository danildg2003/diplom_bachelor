import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNewLoansDTO {
  @ApiProperty({ example: 23000, description: 'Сумма кредита' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  summCredit: number;

  @ApiProperty({ example: 23, description: 'Процентная ставка по кредиту, % годовых' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  stavkaCredit: number;

  @ApiProperty({ example: 5, description: 'Срок оформления кредита, мес.' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(600)
  srokCredit: number;
}
