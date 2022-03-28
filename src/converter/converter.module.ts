import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppLogger } from '~/app.logger';
import { BcbModule } from '~/bcb/bcb.module';
import { CacheService } from '~/config';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    BcbModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
    ConverterService,
    AppLogger
  ],
  controllers: [ConverterController]
})
export class ConverterModule {}
