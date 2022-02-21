import { Injectable } from '@nestjs/common';
import { RELEVANCE } from '~/app.cons';

@Injectable()
export class RootService {
  getHello(): string {
    return RELEVANCE;
  }
}
