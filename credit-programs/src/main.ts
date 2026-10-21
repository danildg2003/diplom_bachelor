import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as promClient from 'prom-client'; // импортируем prom-client

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger конфигурация
  const config = new DocumentBuilder()
    .setTitle('Микросервис расчета платежей')
    .setDescription('Расчет ежемесячного кредитного платежа')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'Access Token',
    )
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Эндпоинт для метрик /api/metrics
  app.getHttpAdapter().get('/api/metrics', async (req, res) => {
    res.setHeader('Content-Type', promClient.register.contentType);
    res.send(await promClient.register.metrics());
  });

  await app.listen(process.env.PORT ?? 8083);
}
bootstrap();
