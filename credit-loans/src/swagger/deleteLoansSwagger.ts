import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function DeleteLoansSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: `Удалить необходимые данные о кредитных расчетах`,
    }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Данные успешно удалены',
    }),
    ApiBadRequestResponse({
      description: 'Некорректный id',
    }),
    ApiNotFoundResponse({
      description: 'Запись не найдена',
    }),
    ApiUnauthorizedResponse({
      description: 'Токен отсутствует или недействителен',
    }),
  );
}
