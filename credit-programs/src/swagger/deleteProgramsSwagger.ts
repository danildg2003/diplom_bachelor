import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function DeleteProgramsSwagger(){
    return applyDecorators(
        ApiOperation({summary: `Удалить информацию о кредитных программах`}),
        ApiBearerAuth('Access Token'),
        ApiOkResponse({
            description: 'Кредитные программы удалены',
        }),
        ApiNotFoundResponse({
            description: 'Кредитные программы не удалены',
        }),
        ApiForbiddenResponse({
            description: 'Недостаточно прав доступа'
        }),
    );
}