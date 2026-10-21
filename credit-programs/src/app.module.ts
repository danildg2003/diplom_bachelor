import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CreditPrograms } from './programs/programs-entity';
import { ProgramsAccess } from './guard/access-token-programs';
import { DatabaseEnumPrograms } from './common/enum/db-enum-programs';
import { AppRepository } from './app.repository';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forFeature([CreditPrograms]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'user',
      password: 'password',
      database: 'credit_programs',
      schema: 'creditPrograms',
      entities: [CreditPrograms],
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
    ProgramsAccess,
    AppService,
    AppRepository,
    {
      provide: DatabaseEnumPrograms.creditPrograms,
      useFactory: (dataSource: DataSource) => dataSource,
    },
  ],
  exports: [AppService, AppRepository, DatabaseEnumPrograms.creditPrograms, JwtModule],
})
export class AppModule {}
