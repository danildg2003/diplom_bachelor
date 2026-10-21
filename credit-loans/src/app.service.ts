import { Injectable, Logger } from '@nestjs/common';
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
    if (!loans.items) {
      this.logger.log('Номера не найдены');
      notice.addError('Номера не найдены', '', InterlayersStatusesLoans.NOT_FOUND);
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
    const { summCredit, srokCredit } = deleteLoansDTO;
    const loan = await this.LoansRepository.findOne({
      where: { summCredit, srokCredit },
    });
    if (!loan) {
      return { success: false, message: 'Запись не найдена' };
    }
    await this.LoansRepository.remove(loan);
    return { success: true, message: 'Запись успешно удалена' };
  }
}
