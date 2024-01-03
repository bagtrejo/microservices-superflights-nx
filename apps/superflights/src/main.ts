/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AllExceptionFilter } from './app/common/filters/http-exception.filter';
import { TimeoutInterceptor } from './app/common/interceptors/timeout.interceptor';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  const options = new DocumentBuilder()
    .setTitle('SuperFlight API')
    .setDescription('Scheduled Flights App')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    }
  });

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
