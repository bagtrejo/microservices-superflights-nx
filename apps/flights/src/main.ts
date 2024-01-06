/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from '@superflights/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URLS],
      queue: RabbitMQ.FlightQueue,
    }
  });

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  
  await app.listen();
  Logger.log(
    `🚀 Corriendo microservicio flights`
  );
}

bootstrap();
