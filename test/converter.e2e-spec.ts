import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import request from 'supertest';
import { BcbModule } from '~/bcb/bcb.module';
import { BcbService } from '~/bcb/bcb.service';
import { ConverterModule } from '~/converter/converter.module';
import { ConverterService } from '~/converter/converter.service';

type SutTypes = {
  server: request.SuperTest<request.Test>;
};

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

describe('ConverterController (e2e)', () => {
  let app: INestApplication;
  let service: BcbService;
  let converterService: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConverterModule, BcbModule]
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: false,
        forbidUnknownValues: true
      })
    );
    await app.init();

    service = module.get<BcbService>(BcbService);
    converterService = module.get<ConverterService>(ConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(converterService).toBeDefined();
  });

  const makeSut = (): SutTypes => {
    jest.spyOn(service, 'convertValue').mockResolvedValueOnce(of(httpResponse1));
    jest.spyOn(service, 'convertValue').mockResolvedValueOnce(of(httpResponse2));
    jest.spyOn(service, 'convertValue').mockResolvedValueOnce(of(httpResponse3));
    const server = request(app.getHttpServer());
    return {
      server
    };
  };

  it('should return a list with correct conversions', async () => {
    const { server } = makeSut();
    await server
      .get('/converter')
      .query({
        value: 1
      })
      .expect(({ body }) => {
        expect(body.conversions[0]).toEqual(httpResponse1);
        expect(body.conversions[1]).toEqual(httpResponse2);
        expect(body.conversions[2]).toEqual(httpResponse3);
      });
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});
