import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function PutProgramsSwagger(){
    return applyDecorators(
        ApiOperation({summary: `Добавить информацию о кредитных программах`}),
        ApiBearerAuth('Access Token'),
        ApiCreatedResponse({
            description: 'Информация добавлена успешно',
        }),
        ApiBadRequestResponse({
            description: 'Некорректные данные',
        }),
        ApiUnauthorizedResponse({
            description: 'Токен отсутствует или недействителен'
        }),
        ApiInternalServerErrorResponse({
            description: 'Не удалось добавить информацию',
        }),
    );
}