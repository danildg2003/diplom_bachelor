import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export function PutProgramsSwagger(){
    return applyDecorators(
        ApiOperation({summary: `Добавить информацию о кредитных программах`}),
        ApiBearerAuth('Access Token'),
        ApiOkResponse({
            description: 'Информация добавлена успешно',
        }),
        ApiNotFoundResponse({
            description: 'Не удалось добавить информацию',
        }),
        ApiForbiddenResponse({
            description: 'Недостаточно прав доступа'
        }),
    );
}