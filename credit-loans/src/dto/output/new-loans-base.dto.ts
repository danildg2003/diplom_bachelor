import { ApiProperty } from '@nestjs/swagger';

export class NewLoansBaseDTO {
  @ApiProperty({ example: '1234' })
  total: number;

  @ApiProperty({ example: '1/2/3/4/5' })
  pages: number;

  @ApiProperty({ example: '123' })
  pageNum: number;

}
