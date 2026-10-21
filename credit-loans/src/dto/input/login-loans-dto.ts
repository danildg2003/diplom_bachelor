import { ApiProperty } from '@nestjs/swagger';

export class LoginLoansDto {
  @ApiProperty({ example: 'admin1', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: '1235', description: 'Пароль' })
  password: string;
}
