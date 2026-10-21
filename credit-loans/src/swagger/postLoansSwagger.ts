import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function PostLoansSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Записать новые кредитные расчеты` }),
    ApiBearerAuth('Access Token'),
    ApiOkResponse({
      description: 'Данные успешно зарегистрированы',
    }),
    ApiNotFoundResponse({
      description: 'Не удалось зарегистрировать данные',
    }),
    ApiForbiddenResponse({
      description: 'Недостаточно прав доступа',
    }),
  );
}
