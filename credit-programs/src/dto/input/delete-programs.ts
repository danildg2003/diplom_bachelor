import { ApiProperty } from "@nestjs/swagger";


export class DeleteProgramsDTO {
    @ApiProperty({
        description: 'Название кредитной программы'
    })
    creditProgram: string;

    @ApiProperty({
        description: 'Информация о кредитной программе'
    })
    informationProgram: string;
}
