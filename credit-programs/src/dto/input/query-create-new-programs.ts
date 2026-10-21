import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';


export class CreateNewProgramsDTO {
  @ApiProperty({ example: 'Ипотека', description: 'Кредитная программа' })
  @IsOptional()
  creditProgram: string;

  @ApiProperty({ example: 'Программа для юр.лиц', description: 'Информация о кредитной программе' })
  @IsOptional()
  informationProgram: string;

}
