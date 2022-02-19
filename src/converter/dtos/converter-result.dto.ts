import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';
import { ConverterRequestDTO } from '~/converter/dtos';
import { ConvertedValueModel } from '~/converter/models/converted-value-model';

export class ConverterResultDTO extends ConverterRequestDTO {
  @Expose()
  @IsArray()
  @ApiProperty({
    type: [ConvertedValueModel],
    description: 'List (in Array format) containing all prices found.',
    example: [
      {
        currency: 'USD',
        code: 220,
        price: 25.6665
      },
      {
        currency: 'EUR',
        code: 978,
        price: 3999
      },
      {
        currency: 'INR',
        code: 860,
        price: 0.3438
      }
    ]
  })
  conversions: ConvertedValueModel[];
}
