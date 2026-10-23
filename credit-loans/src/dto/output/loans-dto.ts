import { ApiProperty } from '@nestjs/swagger';

export class LoansDTO {
  @ApiProperty({ example: '2d8e1095-8064-4c31-9754-78049ccca368' })
  id: string;

  @ApiProperty({ example: 25000 })
  summCredit: number;

  @ApiProperty({ example: 23 })
  stavkaCredit: number;

  @ApiProperty({ example: 5 })
  srokCredit: number;
}
