import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const NODE_ENV = configService.get<string>('NODE_ENV');
export const APP_PORT = configService.get<number>('APP_PORT');
export const APP_VERSION = configService.get<string>('APP_VERSION');
export const APP_VERSION_PREFIX = configService.get<string>('APP_VERSION_PREFIX');
export const APP_BACKEND_API_URL_PROD = configService.get<string>('APP_BACKEND_API_URL_PROD');

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;

export const CONVERSION_API_URL_BCB = configService.get<string>('CONVERSION_API_URL_BCB');

export const CACHE_TIME_TO_LIVE = configService.get<number>('CACHE_TIME_TO_LIVE') || 5;
export const CACHE_MAX_NUMBER = configService.get<number>('CACHE_MAX_NUMBER') || 10;
