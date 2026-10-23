import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppRepository } from './app.repository';
import { CreditLoans } from './loans/loans-entity';
import { LoansBaseDTO } from './dto/output/loans-base.dto';
import { Interlayer, InterlayersStatusesLoans } from './model/interlayerLoans';
import { CreateNewLoansDTO } from './dto/input/query-create-new-loans';
import { DeleteLoansDTO } from './dto/input/delete-loans';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(CreditLoans) private readonly LoansRepository: Repository<CreditLoans>,
    private readonly appRepository: AppRepository,
  ) {}

  async getLoans(
    PagePlates: number,
    NumPlates: number,
  ): Promise<Interlayer<LoansBaseDTO>> {
    const notice = new Interlayer<LoansBaseDTO>();
    const loans: LoansBaseDTO = await this.appRepository.getLoans(
      PagePlates,
      NumPlates,
    );
    // записи есть, но запрошенная страница за пределами последней
    if (loans.total > 0 && loans.items.length === 0) {
      this.logger.log('Страница не найдена');
      notice.addError(
        `Страница ${PagePlates} не найдена, всего страниц: ${loans.pages}`,
        '',
        InterlayersStatusesLoans.NOT_FOUND,
      );
      return notice;
    }
    notice.addData(loans);
    return notice;
  }

  async createNewLoans(createNewLoans: CreateNewLoansDTO) {
    try {
      const newLoans = this.LoansRepository.create(createNewLoans);
      const savedLoans = await this.LoansRepository.save(newLoans);
      return savedLoans;
    } catch (error) {
      this.logger.error(`Ошибка при создании записи: ${error.message}`);
      throw new Error('Не удалось создать новую запись');
    }
  }

  async deleteLoans(deleteLoansDTO: DeleteLoansDTO) {
    const loan = await this.LoansRepository.findOne({
      where: { id: deleteLoansDTO.id },
    });
    if (!loan) {
      throw new NotFoundException('Запись не найдена');
    }
    await this.LoansRepository.remove(loan);
    return { success: true, message: 'Запись успешно удалена' };
  }
}
