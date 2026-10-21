import { ApiProperty } from '@nestjs/swagger';

export class LoginProgramsDto {
  @ApiProperty({ example: 'admin2', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: '1235', description: 'Пароль' })
  password: string;
}
