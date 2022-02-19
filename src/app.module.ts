import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheService } from '~/config';
import { RootModule } from '~/root/root.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: CacheService
    }),
    RootModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class AppModule {}
