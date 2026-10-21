import { ApiProperty } from '@nestjs/swagger';

export class LoansDTO {
  @ApiProperty({ example: '123' })
  id: number;

  @ApiProperty({ example: '25000' })
  summCredit: number;

  @ApiProperty({ example: '23' })
  stavkaCredit: number;

  @ApiProperty({ example: '5' })
  srokCredit: number;
}
