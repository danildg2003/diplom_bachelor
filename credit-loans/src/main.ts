import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as promClient from 'prom-client'; // импортируем prom-client

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальный префикс
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  // Swagger
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

  // Метрикиа
  app.getHttpAdapter().get('/api/metrics', async (req, res) => {
    res.setHeader('Content-Type', promClient.register.contentType);
    res.send(await promClient.register.metrics());
  });
  await app.listen(8082);
}
bootstrap();

