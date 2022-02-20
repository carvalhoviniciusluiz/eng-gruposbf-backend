import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { CONVERSION_API_URL_BCB } from '~/app.vars';
import { getEnumByValue, Locale } from '~/bcb/enums';
import { BcbApiException } from '~/bcb/exceptions';
import { ConversionResponse, GetConversionParams } from '~/bcb/types';

type BcbResponseApi = {
  value: number;
};

@Injectable()
export class BcbService {
  constructor(private httpService: HttpService) {}

  async convertValue({
    value,
    valueCalculation = 1, // i.e., 1 dollar
    currentCurrency = Locale.BRL,
    currencyConversion,
    quotationDate = '2022-02-18'
  }: GetConversionParams): Promise<Observable<ConversionResponse>> {
    const url = `${CONVERSION_API_URL_BCB}/${value}/${valueCalculation}/${currencyConversion}/${currentCurrency}/${quotationDate}`;

    return this.httpService.get(url).pipe(
      map((response: AxiosResponse<BcbResponseApi>) => {
        const { value } = response.data;
        return {
          currency: getEnumByValue(currencyConversion),
          code: currencyConversion,
          price: value ?? 0
        };
      }),
      catchError(() => {
        throw new BcbApiException();
      })
    );
  }
}
