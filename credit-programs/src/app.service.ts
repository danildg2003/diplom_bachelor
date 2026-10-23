import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditPrograms } from './programs/programs-entity';
import { Interlayer, InterlayersStatusesPrograms } from './model/interlayerPrograms';
import { ProgramsBaseDTO } from './dto/output/programs-base.dto';
import { CreateNewProgramsDTO } from './dto/input/query-create-new-programs';
import { DeleteProgramsDTO } from './dto/input/delete-programs';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(CreditPrograms) private readonly creditRepository: Repository<CreditPrograms>,
    private readonly appRepository: AppRepository,
  ) {}

  async getPrograms(
    PagePlates: number,
    NumPlates: number,
  ): Promise<Interlayer<ProgramsBaseDTO>> {
    const notice = new Interlayer<ProgramsBaseDTO>();
    const programs: ProgramsBaseDTO = await this.appRepository.getPrograms(
      PagePlates,
      NumPlates,
    );

    // записи есть, но запрошенная страница за пределами последней
    if (programs.total > 0 && programs.items.length === 0) {
      this.logger.log('Страница не найдена');
      notice.addError(
        `Страница ${PagePlates} не найдена, всего страниц: ${programs.pages}`,
        '',
        InterlayersStatusesPrograms.NOT_FOUND,
      );
      return notice;
    }
    notice.addData(programs);
    return notice;
  }

  async createNewPrograms(createNewPrograms: CreateNewProgramsDTO) {
    try {
      const newCredit = this.creditRepository.create(createNewPrograms);
      const savedCredit = await this.creditRepository.save(newCredit);
      return savedCredit;
    } catch (error) {
      this.logger.error(`Ошибка при создании записи: ${error.message}`);
      throw new Error('Не удалось создать новую запись');
    }
  }

  async deleteProgram(deleteProgramDTO: DeleteProgramsDTO) {
    const program = await this.creditRepository.findOne({
      where: { id: deleteProgramDTO.id },
    });
    if (!program) {
      throw new NotFoundException('Запись не найдена');
    }
    await this.creditRepository.remove(program);
    return { success: true, message: 'Запись успешно удалена' };
  }
}
