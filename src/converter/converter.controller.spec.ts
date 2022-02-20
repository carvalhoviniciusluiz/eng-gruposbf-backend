import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { BcbModule } from '~/bcb/bcb.module';
import { BcbApiException } from '~/bcb/exceptions';
import { ConverterController } from '~/converter/converter.controller';
import { ConverterService } from '~/converter/converter.service';
import { ConverterParams, ConverterResponse } from '~/converter/types';

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
  let logger: AppLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, BcbModule],
      controllers: [ConverterController],
      providers: [ConverterService, AppLogger]
    }).compile();

    controller = module.get<ConverterController>(ConverterController);
    service = module.get<ConverterService>(ConverterService);
    logger = module.get<AppLogger>(AppLogger);
    logger.print = jest.fn();
  });

  const makeSut = async (params = mockRequestValue, result = mockResolvedValue) => {
    jest.spyOn(service, 'converter').mockResolvedValueOnce(result);
    const response = await controller.converter(params);
    return {
      response
    };
  };

  it('should throw BadRequestException', async () => {
    jest.spyOn(service, 'converter').mockImplementationOnce(() => Promise.reject(new BcbApiException()));
    const promise = makeSut();
    expect(promise).rejects.toThrow(BadRequestException);
  });

  it('should return list with values', async () => {
    const { response } = await makeSut({
      value: 5
    });
    expect(response).toEqual(mockResolvedValue);
  });
});
