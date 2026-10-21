import { CreateProgramsResultSwagger } from './swagger/createProgramsResultSwagger';
import { PutProgramsSwagger } from './swagger/postProgramsSwagger';
import { DeleteProgramsSwagger } from './swagger/deleteProgramsSwagger';
import { ProgramsAccess } from './guard/access-token-programs';
import { QueryProgramsInputDTO } from './dto/input/query-create-programs';
import { ProgramsBaseDTO } from './dto/output/programs-base.dto';
import { CreateNewProgramsDTO } from './dto/input/query-create-new-programs';
import { DeleteProgramsDTO } from './dto/input/delete-programs';
import { AppService } from './app.service';
import {
  Param,
  Controller,
  Get,
  Query,
  UseGuards,
  Logger,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { statusInterlayerMapperPrograms } from './function/status-interlayer-mapper';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}
  @UsePipes(new ValidationPipe({ transform: true }))

  /**
   * Получить список номерных знаков
   */
  @Get('create/programs')
  @UseGuards(ProgramsAccess)
  @CreateProgramsResultSwagger()
  async getPrograms(
    @Query() ProgramsCreateInputDTO: QueryProgramsInputDTO,
  ): Promise<ProgramsBaseDTO> {
    const programsInterlayer = await this.appService.getPrograms(
      ProgramsCreateInputDTO.PageInfo,
      ProgramsCreateInputDTO.ProgramsQuantity,
    );
    if (programsInterlayer.hasError()) {
      this.logger.error(programsInterlayer.extensions[0].message);
      return statusInterlayerMapperPrograms(programsInterlayer);
    }
    if (!programsInterlayer.data) {
      this.logger.error('Error');
      return {
        pages: 0,
        pageNum: 0,
        total: 0,
        items: [],
      };
    }
    return {
      pages: programsInterlayer.data.pages,
      pageNum: programsInterlayer.data.pageNum,
      total: programsInterlayer.data.total,
      items: programsInterlayer.data.items,
    };
  }

  /**
   * Внести новую информацию о номерных знаках и автомобиле
   */

  @PutProgramsSwagger()
  @UseGuards(ProgramsAccess)
  @Post('post/programs')
  @HttpCode(HttpStatus.CREATED)
  async createNewPrograms(@Body() createNewInfoPrograms: CreateNewProgramsDTO) {
    try {
      const createNewPrograms =
        await this.appService.createNewPrograms(createNewInfoPrograms);
      return { success: true, data: createNewPrograms };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * Удалить необходимую информацию о номерах
   */

  @DeleteProgramsSwagger()
  @UseGuards(ProgramsAccess)
  @Delete('delete/programs')
  @HttpCode(HttpStatus.OK)
  async deleteProgram(@Param() deleteProgramsDto: DeleteProgramsDTO) {
    return this.appService.deleteProgram(deleteProgramsDto);
  }
}
