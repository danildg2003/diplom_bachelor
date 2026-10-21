import { ApiProperty } from "@nestjs/swagger";
import { ProgramsDTO } from "./programs.dto";

export class ProgramsBaseDTO {
  @ApiProperty({ example: '1' })
  total: number;

  @ApiProperty({ example: '2' })
  pages: number;

  @ApiProperty({ example: '3' })
  pageNum: number;

  @ApiProperty({
    type: String,
    isArray: true,
    example: ['nameCar: string', 'WordPlates: string', 'NumPlates: number'],
  })
  items: ProgramsDTO[];
}