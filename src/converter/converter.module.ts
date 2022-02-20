import { Module } from '@nestjs/common';
import { BcbModule } from '~/bcb/bcb.module';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

@Module({
  imports: [BcbModule],
  controllers: [ConverterController],
  providers: [ConverterService]
})
export class ConverterModule {}
