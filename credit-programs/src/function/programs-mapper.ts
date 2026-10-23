import { ProgramsDTO } from "../dto/output/programs.dto";
import { CreditPrograms } from "../programs/programs-entity";


export const programsMapper = (programms: CreditPrograms): ProgramsDTO => {
    return {
        id: programms.id,
        creditProgram: programms.creditProgram,
        informationProgram: programms.informationProgram,
    };
};