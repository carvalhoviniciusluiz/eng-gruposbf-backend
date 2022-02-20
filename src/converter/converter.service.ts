import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { BcbService } from '~/bcb/bcb.service';
import { Locale } from '~/bcb/enums';
import { ConverterParams, ConverterResponse } from '~/converter/types';

@Injectable()
export class ConverterService {
  constructor(private readonly bcbService: BcbService) {}

  getValueTo(currencyConversion: Locale, params: ConverterParams) {
    return this.bcbService.convertValue({
      ...params,
      currencyConversion
    });
  }

  async converter(params: ConverterParams): Promise<ConverterResponse> {
    const bcbResponse = await Promise.all([
      this.getValueTo(Locale.USD, params),
      this.getValueTo(Locale.EUR, params),
      this.getValueTo(Locale.INR, params)
    ]);

    const promises = bcbResponse.map(async observable => {
      const apiResult = observable.pipe(
        map(async response => {
          return response;
        })
      );

      return await lastValueFrom(apiResult);
    });

    const conversions = await Promise.all(promises);

    return {
      value: params.value,
      valueCalculation: params.valueCalculation ?? 1,
      quotationDate: params.quotationDate ?? '2022-02-18',
      conversions
    };
  }
}
