import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreditLoans } from './loans/loans-entity';
import { LoansBaseDTO } from './dto/output/loans-base.dto';
import { NewLoansBaseDTO } from './dto/output/new-loans-base.dto';

@Injectable()
export class AppRepository {
  private readonly logger = new Logger(AppRepository.name);
  constructor(
    @InjectDataSource() private readonly dataSourceLoans: DataSource,
  ) {}

  async getLoans(
    PagePlates: number,
    NumPlates: number,
  ): Promise<LoansBaseDTO> {
    this.logger.log('Plates started');
    const LoansRepository = this.dataSourceLoans.getRepository(CreditLoans);
    try {
      const skip = Math.floor(NumPlates * (PagePlates - 1));
      const loanss = await LoansRepository.find({
        select: {
          id: true,
          summCredit: true,
          stavkaCredit: true,
          srokCredit: true,
        },
        skip: skip,
        take: NumPlates,
      });
      const itemMapped =
      loanss.length > 0
        ? loanss.map((loan) => {
            const monthlyProcentStavka = loan.stavkaCredit / 100 / 12;

            // при ставке 0% формула аннуитета делит на ноль, платеж просто сумма / срок
            const monthlyPlatezh =
              monthlyProcentStavka === 0
                ? loan.summCredit / loan.srokCredit
                : (loan.summCredit * monthlyProcentStavka * Math.pow(1 + monthlyProcentStavka, loan.srokCredit)) /
                  (Math.pow(1 + monthlyProcentStavka, loan.srokCredit) - 1);
    
            const overpayment = monthlyPlatezh * loan.srokCredit - loan.summCredit;
    
            const effectiveAnnualRate = (Math.pow(1 + monthlyProcentStavka, 12) - 1) * 100;
    
            return {
              ...loan,
              monthlyPlatezh: Math.round(monthlyPlatezh),
              overpayment: Math.round(overpayment),
              effectiveAnnualRate: Math.round(effectiveAnnualRate),
            };
          })
        : [];
      const ResultAsyncNewLoans = await this.getNewLoans(
        PagePlates,
        NumPlates,
      );
      // если в массиве чет есть, то маплю
      return {
        pageNum: ResultAsyncNewLoans.pageNum,
        pages: ResultAsyncNewLoans.pages,
        total: ResultAsyncNewLoans.total,
        items: itemMapped,
      };
    } catch (e) {
      this.logger.error('getLoans in error');
      this.logger.debug(e);
      throw new Error('Ошибка при получении данных о номерах');
    }
  }

  // Работа с pages/total
  async getNewLoans(
    PagePlates: number,
    NumPlates: number,
  ): Promise<NewLoansBaseDTO> {
    this.logger.log('get loans ready');
    const PlatesRepository = this.dataSourceLoans.getRepository(CreditLoans);
    let total: number;
    try {
      total = await PlatesRepository.count({
        select: {
          summCredit: true,
          stavkaCredit: true,
          srokCredit: true,
        },
      });
      const pages = Math.ceil(total / NumPlates);
      return {
        pageNum: PagePlates,
        pages: pages,
        total: total,
      };
    } catch (error) {
      this.logger.error('Ошибка при обработке запроса', error);
      throw new Error('Ошибка получения данных');
    }
  }
}

