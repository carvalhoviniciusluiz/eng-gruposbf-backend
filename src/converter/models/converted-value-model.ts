import { ApiProperty } from '@nestjs/swagger';

export class ConvertedValueModel {
  @ApiProperty({
    type: String,
    description: 'Currency type',
    example: 'INR'
  })
  currency: string;

  @ApiProperty({
    type: String,
    description: 'Currency code',
    example: 860
  })
  code: number;

  @ApiProperty({
    type: String,
    description: 'Converted value',
    example: 0.3438
  })
  price: number;
}
