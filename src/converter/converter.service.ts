import { Injectable } from '@nestjs/common';
import { ConverterParams, ConverterResponse } from '~/converter/types';

@Injectable()
export class ConverterService {
  async converter(params: ConverterParams): Promise<ConverterResponse> {
    return {
      value: params.value,
      valueCalculation: 1,
      quotationDate: '2022-02-18',
      conversions: [
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
    };
  }
}
