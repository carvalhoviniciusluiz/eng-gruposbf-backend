import { Locale } from '~/bcb/enums';

export type ConversionResponse = {
  currency: string;
  code: Locale;
  price: number;
};
