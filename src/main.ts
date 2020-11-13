import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { logger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, whitelist: true }));
  await app.listen(3000);
}

bootstrap();
