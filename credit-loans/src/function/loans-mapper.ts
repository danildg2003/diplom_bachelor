import { CreditLoans } from 'src/loans/loans-entity';
import { LoansDTO } from 'src/dto/output/loans-dto';

export const loansMapper = (loanss: CreditLoans): LoansDTO => {
  return {
    id: loanss.id,
    summCredit: loanss.summCredit,
    stavkaCredit: loanss.stavkaCredit,
    srokCredit: loanss.srokCredit,
  };
};
