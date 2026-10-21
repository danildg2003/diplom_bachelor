import { ApiProperty } from '@nestjs/swagger';

export class CalculateLoansDTO {

  @ApiProperty({ example: '10' })
  monthlyPlatezh: number;
  
  @ApiProperty({ example: '100' })
  overpayment: number;

  @ApiProperty({ example: '12' })
  effectiveAnnualRate: number;

}
