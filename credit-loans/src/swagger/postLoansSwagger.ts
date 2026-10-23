import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function PostLoansSwagger() {
  return applyDecorators(
    ApiOperation({ summary: `Записать новые кредитные расчеты` }),
    ApiBearerAuth('Access Token'),
    ApiCreatedResponse({
      description: 'Данные успешно зарегистрированы',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
    }),
    ApiUnauthorizedResponse({
      description: 'Токен отсутствует или недействителен',
    }),
    ApiInternalServerErrorResponse({
      description: 'Не удалось зарегистрировать данные',
    }),
  );
}
