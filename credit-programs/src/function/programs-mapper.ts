import { ProgramsDTO } from "src/dto/output/programs.dto";
import { CreditPrograms } from "src/programs/programs-entity";


export const programsMapper = (programms: CreditPrograms): ProgramsDTO => {
    return {
        id: programms.id,
        creditProgram: programms.creditProgram,
        informationProgram: programms.informationProgram,
    };
};