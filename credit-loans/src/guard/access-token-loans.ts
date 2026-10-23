import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class LoansAccess implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    let authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Токен отсутствует');
      throw new UnauthorizedException('Токен отсутствует');
    }
    authHeader = authHeader.substring(7);
    console.log('Access Token: ', authHeader);
    try {
      const payload = await this.jwtService.verifyAsync(authHeader, {
        secret: process.env.CREDIT_LOANS_JWT_SECRET,
      });
      (request as any).user = payload;
      return true;
    } catch (error) {
      console.log('Ошибка проверки токена:', error.message);
      throw new UnauthorizedException('Токен недействителен');
    }
  }
}
