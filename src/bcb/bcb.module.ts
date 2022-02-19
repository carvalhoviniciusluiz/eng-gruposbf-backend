import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BcbService } from '~/bcb/bcb.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000
    })
  ],
  providers: [BcbService],
  exports: [BcbService]
})
export class BcbModule {}
