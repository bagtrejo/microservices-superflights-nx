/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { RabbitMQ } from '@superflights/shared';

import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URLS],
      queue: RabbitMQ.PassengerQueue
    }
  });

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  
  await app.listen();
  Logger.log(
    `🚀 Corriendo microservicio passengers`
  );
}

bootstrap();
