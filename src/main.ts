import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Nest example')
        .setDescription('The Nest API DESCRIPTION')
        .setVersion('1.0')
        .addTag('nest')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options, {
        operationIdFactory: (
            controllerKey: string,
            methodKey: string
        ) => methodKey
    });

    SwaggerModule.setup('api-docs', app, document);

    app.use(compression());
    app.use(logger);
    app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, whitelist: true }));
    await app.listen(3000);
}

bootstrap();
