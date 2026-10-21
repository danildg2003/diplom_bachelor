import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateAndGetTokenPrograms(username: string, password: string) {
    if (username !== 'admin2' || password !== '1235') {
      throw new UnauthorizedException('Неверные учетные данные');
    }
  
    const payload = { username };
    console.log('JWT_SECRET при создании токена:', process.env.CREDIT_PROGRAMS_JWT_SECRET);
  
    return { access_token: this.jwtService.sign(payload) };
  }  
}
