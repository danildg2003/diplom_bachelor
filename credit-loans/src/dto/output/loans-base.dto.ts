import { ApiProperty } from '@nestjs/swagger';
import { LoansDTO } from './loans-dto';

export class LoansBaseDTO {

  @ApiProperty({ example: '1' })
  total: number;

  @ApiProperty({ example: '2' })
  pages: number;

  @ApiProperty({ example: '3' })
  pageNum: number;

  @ApiProperty({
    type: String,
    isArray: true,
    example: [
      'summCredit: number',
      'stavkaCredit: number',
      'srokCredit: number',
    ],
  })
  items: LoansDTO[];

}
