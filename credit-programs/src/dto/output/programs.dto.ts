import { ApiProperty } from "@nestjs/swagger";

export class ProgramsDTO {
    @ApiProperty({ example: '38669e8c-9d95-448e-bef1-5c5b04c283b5' })
    id: string;

    @ApiProperty({ example: 'Кредитная программа' })
    creditProgram: string;

    @ApiProperty({ example: 'Информация о кредитной программе' })
    informationProgram: string;

};