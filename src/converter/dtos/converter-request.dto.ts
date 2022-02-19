import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class ConverterRequestDTO {
  @Expose()
  @IsNumberString()
  @ApiProperty({
    type: Number,
    description: 'Value for conversion.',
    example: 5
  })
  value: number;

  @Expose()
  @IsNumberString()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    description: 'Value for calculation base, i.e., 1 `dollar`',
    example: 1,
    default: 1
  })
  valueCalculation?: number;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Quotation date',
    example: '2022-02-18',
    default: '2022-02-18'
  })
  quotationDate?: string;
}
