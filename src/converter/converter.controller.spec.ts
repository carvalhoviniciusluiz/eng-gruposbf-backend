import { Test, TestingModule } from '@nestjs/testing';
import { ConverterService } from '~/converter/converter.service';
import { ConverterParams, ConverterResponse } from '~/converter/types';
import { ConverterController } from './converter.controller';

const mockRequestValue: ConverterParams = {
  value: 5
};

const mockResolvedValue: ConverterResponse = {
  value: mockRequestValue.value,
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

describe('ConverterController', () => {
  let controller: ConverterController;
  let service: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConverterController],
      providers: [ConverterService]
    }).compile();

    controller = module.get<ConverterController>(ConverterController);
    service = module.get<ConverterService>(ConverterService);
  });

  const makeSut = async (params = mockRequestValue, result = mockResolvedValue) => {
    jest.spyOn(service, 'converter').mockResolvedValueOnce(result);
    const response = await controller.converter(params);
    return {
      response
    };
  };

  it('should return list with values', async () => {
    const { response } = await makeSut({
      value: 5
    });
    expect(response).toEqual(mockResolvedValue);
  });
});
