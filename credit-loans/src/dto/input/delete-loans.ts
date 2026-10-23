import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteLoansDTO {
  @ApiProperty({
    example: '2d8e1095-8064-4c31-9754-78049ccca368',
    description: 'id кредитного расчета (можно взять из GET create/loans)',
  })
  @IsUUID()
  id: string;
}
