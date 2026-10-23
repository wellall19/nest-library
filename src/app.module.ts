import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { BooksModule } from './books/books.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION'),
      })
    }),
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'nest',
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
