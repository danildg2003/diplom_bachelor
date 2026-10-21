import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateNewLoansDTO {
  @ApiProperty({ example: '23000', description: 'Сумма кредита' })
  @IsOptional()
  summCredit: number;

  @ApiProperty({ example: '23', description: 'Процентная ставка по кредиту' })
  @IsOptional()
  stavkaCredit: number;

  @ApiProperty({ example: '5', description: 'Срок оформления кредита, мес.' })
  srokCredit: number;
}
