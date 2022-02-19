import { Locale } from '~/bcb/enums';

export type GetConversionParams = {
  value: number;
  valueCalculation?: number;
  currentCurrency?: Locale;
  currencyConversion: Locale;
  quotationDate?: string;
};
