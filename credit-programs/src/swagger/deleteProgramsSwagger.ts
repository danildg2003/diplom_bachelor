import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function DeleteProgramsSwagger(){
    return applyDecorators(
        ApiOperation({summary: `Удалить информацию о кредитных программах`}),
        ApiBearerAuth('Access Token'),
        ApiOkResponse({
            description: 'Кредитные программы удалены',
        }),
        ApiBadRequestResponse({
            description: 'Некорректный id',
        }),
        ApiNotFoundResponse({
            description: 'Запись не найдена',
        }),
        ApiUnauthorizedResponse({
            description: 'Токен отсутствует или недействителен'
        }),
    );
}