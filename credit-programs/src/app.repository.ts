import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ProgramsBaseDTO } from './dto/output/programs-base.dto';
import { CreditPrograms } from './programs/programs-entity';
import { programsMapper } from './function/programs-mapper';
import { NewProgramsBaseDTO } from './dto/output/new-programs-base.dto';

@Injectable()
export class AppRepository {
  private readonly logger = new Logger(AppRepository.name);
  constructor(
    @InjectDataSource() private readonly dataSourcePrograms: DataSource,
  ) {}

  // Получаем информацию о номерах с учетом пагинации и фильтрации
  async getPrograms(
    PagePlates: number,
    NumPlates: number,
  ): Promise<ProgramsBaseDTO> {
    this.logger.log('Programs started');
    const ProgramsRepository = this.dataSourcePrograms.getRepository(CreditPrograms);
    try {
      const skip = Math.floor(NumPlates * (PagePlates - 1));
      const programs = await ProgramsRepository.find({
        select: {
            creditProgram: true,
            informationProgram: true,
        },
        skip: skip,
        take: NumPlates,
      });
      const itemMapped =
      programs.length > 0 ? programs.map((programms) => programsMapper(programms)) : [];
      const ResultAsyncNewPrograms = await this.getNewPrograms(
        PagePlates,
        NumPlates,
      );
      // если в массиве чет есть, то маплю
      return {
        pageNum: ResultAsyncNewPrograms.pageNum,
        pages: ResultAsyncNewPrograms.pages,
        total: ResultAsyncNewPrograms.total,
        items: itemMapped,
      };
    } catch (e) {
      this.logger.error('getPrograms in error');
      this.logger.debug(e);
      throw new Error('Ошибка при получении данных о номерах');
    }
  }

  // Работа с pages/total/perPage
  async getNewPrograms(
    PagePlates: number,
    NumPlates: number,
  ): Promise<NewProgramsBaseDTO> {
    this.logger.log('get programs ready');
    const ProgramsRepository = this.dataSourcePrograms.getRepository(CreditPrograms);
    let total: number;
    try {
      total = await ProgramsRepository.count({
        select: {
            creditProgram: true,
            informationProgram: true,
        },
      });
      const programms = Math.ceil(total / NumPlates);
      return {
        pageNum: PagePlates,
        pages: programms,
        total: total,
      };
    } catch (error) {
      this.logger.error('Ошибка при обработке запроса', error);
      throw new Error('Ошибка получения данных');
    }
  }
}
