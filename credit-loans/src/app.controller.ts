import { DeleteLoansDTO } from './dto/input/delete-loans';
import { QueryLoansInputDTO } from './dto/input/query-create-loans';
import { CreateNewLoansDTO } from './dto/input/query-create-new-loans';
import { LoansBaseDTO } from './dto/output/loans-base.dto';
import { statusInterlayerMapperLoans } from './function/status-interlayer-mapper';
import { LoansAccess } from './guard/access-token-loans';
import { CreateLoansResultSwagger } from './swagger/createLoansResultSwagger';
import { DeleteLoansSwagger } from './swagger/deleteLoansSwagger';
import { PostLoansSwagger } from './swagger/postLoansSwagger';
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
import { AppService } from './app.service';


@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}
  @UsePipes(new ValidationPipe({ transform: true }))

  /**
   * Получить список кредитных расчетов
   */
  @Get('create/loans')
  @UseGuards(LoansAccess)
  @CreateLoansResultSwagger()
  async getLoans(
    @Query() LoansCreateInputDTO: QueryLoansInputDTO,
  ): Promise<LoansBaseDTO> {
    const loansInterlayer = await this.appService.getLoans(
      LoansCreateInputDTO.PageInfo,
      LoansCreateInputDTO.LoansQuantity,
    );
    if (loansInterlayer.hasError()) {
      this.logger.error(loansInterlayer.extensions[0].message);
      return statusInterlayerMapperLoans(loansInterlayer);
    }
    if (!loansInterlayer.data) {
      this.logger.error('Error');
      return {
        pages: 0,
        pageNum: 0,
        total: 0,
        items: [],
      };
    }
    return {
      pages: loansInterlayer.data.pages,
      pageNum: loansInterlayer.data.pageNum,
      total: loansInterlayer.data.total,
      items: loansInterlayer.data.items,
    };
  }

  /**
   * Внести новую информацию о номерных знаках и автомобиле
   */

  @PostLoansSwagger()
  @UseGuards(LoansAccess)
  @Post('post/loans')
  @HttpCode(HttpStatus.CREATED)
  async createNewLoans(@Body() createNewInfoLoans: CreateNewLoansDTO) {
    try {
      const createNewLoans =
        await this.appService.createNewLoans(createNewInfoLoans);
      return { success: true, data: createNewLoans };
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

  @DeleteLoansSwagger()
  @UseGuards(LoansAccess)
  @Delete('delete/loans')
  @HttpCode(HttpStatus.OK)
  async deleteLoans(@Param() deleteLoansDto: DeleteLoansDTO) {
    return this.appService.deleteLoans(deleteLoansDto);
  }
}
