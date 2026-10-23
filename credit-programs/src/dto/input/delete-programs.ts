import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";


export class DeleteProgramsDTO {
    @ApiProperty({
        example: '38669e8c-9d95-448e-bef1-5c5b04c283b5',
        description: 'id кредитной программы (можно взять из GET create/programs)'
    })
    @IsUUID()
    id: string;
}
