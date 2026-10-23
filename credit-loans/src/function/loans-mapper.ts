import { CreditLoans } from '../loans/loans-entity';
import { LoansDTO } from '../dto/output/loans-dto';

export const loansMapper = (loanss: CreditLoans): LoansDTO => {
  return {
    id: loanss.id,
    summCredit: loanss.summCredit,
    stavkaCredit: loanss.stavkaCredit,
    srokCredit: loanss.srokCredit,
  };
};
