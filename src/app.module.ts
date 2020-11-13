import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { Photo } from './users/entities/photo.entity';
import { UsersModule } from './users/users.module';
import { auth } from './middlewares/auth.middleware';
import { ProductsModule } from './products/products.module';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AudioModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Photo, User],
    autoLoadEntities: true,
    synchronize: process.env?.NODE_ENV !== 'prod' ? true : false,
  }),
    UsersModule,
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(auth)
      .exclude('/users/register')
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
