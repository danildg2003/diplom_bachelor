// здесь будет показано просто выведение данных по нескольким query
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function CreateLoansResultSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Получить информацию о кредитных расчетах` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Информация найдена',
    }),
    ApiNotFoundResponse({
      description: 'Запрошенная страница не найдена',
    }),
    ApiUnauthorizedResponse({
      description: 'Токен отсутствует или недействителен',
    }),
  );
}
