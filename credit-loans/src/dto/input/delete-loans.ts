import { ApiProperty } from '@nestjs/swagger';

export class DeleteLoansDTO {
  @ApiProperty({
    description: 'Сумма кредита',
  })
  summCredit: number;

  @ApiProperty({
    description: 'Кредитная ставка',
  })
  srokCredit: number;
}
