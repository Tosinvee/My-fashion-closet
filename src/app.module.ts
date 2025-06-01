import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from './config/environment';
import { FeaturesModule } from './features/features.module';
import { UtilsModule } from './utils/utils.module';
import { CoreModule } from './core/core.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from './core/filter/exceptions.filter';
import { ResponseInterceptor } from './core/response/responseInterceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(environments.mongodb_uri),
    FeaturesModule,
    UtilsModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_FILTER,
      useValue: ExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
