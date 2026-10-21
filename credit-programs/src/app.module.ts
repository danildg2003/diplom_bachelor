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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('CREDIT_PROGRAMS_HOST', 'localhost'),
        port: Number(configService.get('CREDIT_PROGRAMS_PORT', 5435)),
        username: configService.get<string>('CREDIT_PROGRAMS_USER'),
        password: configService.get<string>('CREDIT_PROGRAMS_PASSWORD'),
        database: configService.get<string>('CREDIT_PROGRAMS_DATABASE'),
        schema: configService.get<string>('CREDIT_PROGRAMS_SCHEMA'),
        entities: [CreditPrograms],
        autoLoadEntities: true,
        synchronize: true,
      }),
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
