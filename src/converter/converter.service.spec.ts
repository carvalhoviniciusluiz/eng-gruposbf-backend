import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { BcbModule } from '~/bcb/bcb.module';
import { BcbService } from '~/bcb/bcb.service';
import { ConverterService } from './converter.service';

const httpResponse1 = {
  currency: '999',
  code: 999,
  price: 999
};

const httpResponse2 = {
  currency: '888',
  code: 888,
  price: 888
};

const httpResponse3 = {
  currency: '777',
  code: 777,
  price: 777
};

describe('ConverterService', () => {
  let service: ConverterService;
  let bcbService: BcbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BcbModule],
      providers: [ConverterService]
    }).compile();

    service = module.get<ConverterService>(ConverterService);
    bcbService = module.get<BcbService>(BcbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(bcbService).toBeDefined();
  });

  it('should return a list with correct conversions', async () => {
    jest.spyOn(bcbService, 'convertValue').mockResolvedValueOnce(of(httpResponse1));
    jest.spyOn(bcbService, 'convertValue').mockResolvedValueOnce(of(httpResponse2));
    jest.spyOn(bcbService, 'convertValue').mockResolvedValueOnce(of(httpResponse3));

    const response = await service.converter({
      value: 1
    });

    expect(response.conversions[0]).toEqual(httpResponse1);
    expect(response.conversions[1]).toEqual(httpResponse2);
    expect(response.conversions[2]).toEqual(httpResponse3);
  });
});
