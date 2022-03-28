import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { BcbModule } from '~/bcb/bcb.module';
import { BcbService } from '~/bcb/bcb.service';
import { ConverterModule } from '~/converter/converter.module';
import { ConverterService } from '~/converter/converter.service';

type SutTypes = {
  server: request.SuperTest<request.Test>;
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
    const server = request(app.getHttpServer());
    return {
      server
    };
  };

  it('should return a list with correct conversions', async () => {
    const { server } = makeSut();

    const httpResponse = {
      value: '1',
      valueCalculation: 1,
      quotationDate: '2022-02-18',
      conversions: [
        { currency: 'USD', code: 220, price: 5.1333 },
        { currency: 'EUR', code: 978, price: 5.8217 },
        { currency: 'INR', code: 860, price: 0.06875 }
      ]
    };

    await server
      .get('/converter')
      .query({
        value: 1
      })
      .expect(({ body }) => {
        expect(body).toEqual(httpResponse);
      });
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
});
