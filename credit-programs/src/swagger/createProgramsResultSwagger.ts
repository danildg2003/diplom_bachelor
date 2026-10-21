import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function CreateProgramsResultSwagger(){
    return applyDecorators(
        ApiOperation({summary: `Получить информацию о кредитных программах`}),
        ApiBearerAuth('Access Token'),
        ApiOkResponse({
            description: 'Кредитные программы получены',
        }),
        ApiNotFoundResponse({
            description: 'Кредитные программы не получены',
        }),
        ApiForbiddenResponse({
            description: 'Недостаточно прав доступа'
        }),
    );
}