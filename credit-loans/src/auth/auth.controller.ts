import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { example: 'user' },
        password: { example: 'password' },
      },
      required: ['username', 'password'],
    },
  })
  async getToken(@Body() body: { username: string; password: string }) {
    console.log('Полученные данные:', body);
    if (!body || !body.username || !body.password) {
      return { message: 'Ошибка: username и password обязательны' };
    }
    return this.authService.validateAndGetTokenLoans(
      body.username,
      body.password,
    );
  }
}
