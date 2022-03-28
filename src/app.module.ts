import { Module } from '@nestjs/common';
import { BcbModule } from './bcb/bcb.module';
import { ConverterModule } from './converter/converter.module';

@Module({
  imports: [BcbModule, ConverterModule]
})
export class AppModule {}
