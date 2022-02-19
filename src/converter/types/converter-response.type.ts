import { ConvertedValueModel } from '~/converter/models/converted-value-model';

export type ConverterResponse = {
  value: number;
  valueCalculation: number;
  quotationDate: string;
  conversions: ConvertedValueModel[];
};
