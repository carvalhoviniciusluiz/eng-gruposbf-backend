import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { BcbModule } from '~/bcb/bcb.module';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

@Module({
  imports: [BcbModule],
  controllers: [ConverterController],
  providers: [ConverterService, AppLogger]
})
export class ConverterModule {}
