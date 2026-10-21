import { ApiProperty } from "@nestjs/swagger";

export class ProgramsDTO {
    @ApiProperty({ example: '123' })
    id: number;

    @ApiProperty({ example: 'Кредитная программа' })
    creditProgram: string;

    @ApiProperty({ example: 'Информация о кредитной программе' })
    informationProgram: string;

};