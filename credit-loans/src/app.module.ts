import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Client } from 'pg';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connection = {
          host: configService.get<string>('CREDIT_LOANS_HOST', 'localhost'),
          port: Number(configService.get('CREDIT_LOANS_PORT', 5437)),
          user: configService.get<string>('CREDIT_LOANS_USER'),
          password: configService.get<string>('CREDIT_LOANS_PASSWORD'),
          database: configService.get<string>('CREDIT_LOANS_DATABASE'),
        };
        const schema = configService.get<string>('CREDIT_LOANS_SCHEMA', 'creditLoans');

        // synchronize создает таблицы, но не схему - на пустой БД создаем ее сами
        const client = new Client(connection);
        await client.connect();
        await client.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
        await client.end();

        return {
          type: 'postgres',
          host: connection.host,
          port: connection.port,
          username: connection.user,
          password: connection.password,
          database: connection.database,
          schema,
          entities: [CreditLoans],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
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
