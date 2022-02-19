import { Test, TestingModule } from '@nestjs/testing';
import { ConverterService } from './converter.service';

const mockedValue = {
  value: 1,
  valueCalculation: 1,
  quotationDate: '2022-02-18',
  conversions: [
    { currency: 'USD', code: 220, price: 25.6665 },
    { currency: 'EUR', code: 978, price: 3999 },
    { currency: 'INR', code: 860, price: 0.3438 }
  ]
};

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterService]
    }).compile();

    service = module.get<ConverterService>(ConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', async () => {
    const res = await service.converter({
      value: 1
    });
    expect(res).toEqual(mockedValue);
  });
});
