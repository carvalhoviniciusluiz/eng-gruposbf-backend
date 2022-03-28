import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { Observable, of, throwError } from 'rxjs';
import { Locale } from '~/bcb/enums';
import { BcbApiUnexpectedError } from '~/bcb/exceptions';
import { ConversionResponse } from '~/bcb/types';
import { BcbService } from './bcb.service';

jest.mock('@nestjs/axios');

const mockedAxiosResult: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};

const mockedConversionParams = {
  value: 0,
  currencyConversion: Locale.EUR
};

type PriceSutTypes = {
  httpResponse: Observable<ConversionResponse>;
};

describe('BcbService', () => {
  let service: BcbService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BcbService, HttpService]
    }).compile();

    service = module.get<BcbService>(BcbService);
    httpService = module.get<HttpService>(HttpService);
  });

  const makeSut = async (params = mockedConversionParams, resultValue = mockedAxiosResult): Promise<PriceSutTypes> => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(resultValue));
    const httpResponse = await service.convertValue(params);
    return { httpResponse };
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  it('should throw badrequest', async () => {
    const httpResponseError = {
      response: {},
      status: 500
    };
    httpService.get = jest.fn(() => throwError(() => httpResponseError));
    const { httpResponse } = await makeSut();
    httpResponse.subscribe({
      error: err => {
        expect(err).toEqual(httpResponseError);
      }
    });
  });

  it('should throw BcbApiUnexpectedError', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => throwError(() => new Error()));
    const { httpResponse } = await makeSut();
    httpResponse.subscribe({
      error: err => {
        expect(err).toBeInstanceOf(BcbApiUnexpectedError);
      }
    });
  });

  it('should return an zero value', async () => {
    const { httpResponse } = await makeSut();
    httpResponse.subscribe(response => {
      expect(response.price).toBe(0);
    });
  });

  it('should return an 25.6665000 value', async () => {
    mockedAxiosResult.data = {
      value: 25.6665
    };
    const { httpResponse } = await makeSut();
    httpResponse.subscribe(response => {
      expect(response.price).toBe(mockedAxiosResult.data.value);
    });
  });
});
