import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { AuthModule } from './auth/auth.module';
import { CreditLoans } from './loans/loans-entity';
import { LoansAccess } from './guard/access-token-loans';
import { DatabaseEnumLoans } from './common/enum/db-enum-loans';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forFeature([CreditLoans]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5437,
      username: 'user',
      password: 'password',
      database: 'credit_loans',
      schema: 'creditLoans',
      entities: [CreditLoans],
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Получаем ключ из .env
        signOptions: { expiresIn: '1h' }, // Настройки токена
      }),
    }),
    PrometheusModule.register(),
  ],
  controllers: [AuthController, AppController],
  providers: [
    LoansAccess,
    AppService,
    AppRepository,
    {
      provide: DatabaseEnumLoans.creditLoans,
      useFactory: (dataSource: DataSource) => dataSource,
    },
  ],
  exports: [AppService, AppRepository, DatabaseEnumLoans.creditLoans, JwtModule],
})
export class AppModule {}
