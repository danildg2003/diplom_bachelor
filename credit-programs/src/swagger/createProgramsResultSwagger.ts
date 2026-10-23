import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function CreateProgramsResultSwagger(){
    return applyDecorators(
        ApiOperation({summary: `Получить информацию о кредитных программах`}),
        ApiBearerAuth('Access Token'),
        ApiOkResponse({
            description: 'Кредитные программы получены',
        }),
        ApiNotFoundResponse({
            description: 'Запрошенная страница не найдена',
        }),
        ApiUnauthorizedResponse({
            description: 'Токен отсутствует или недействителен'
        }),
    );
}