import { ApiProperty } from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { LineValidationPrograms } from '../../common/validates/validate-line';


export class CreateNewProgramsDTO {
  @ApiProperty({ example: 'Ипотека', description: 'Кредитная программа' })
  @Validate(LineValidationPrograms)
  creditProgram: string;

  @ApiProperty({ example: 'Программа для юр.лиц', description: 'Информация о кредитной программе' })
  @Validate(LineValidationPrograms)
  informationProgram: string;

}
