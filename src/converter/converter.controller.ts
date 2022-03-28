import { BadRequestException, CacheInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from '~/app.logger';
import { BcbApiUnexpectedError } from '~/bcb/exceptions';
import { ConverterService } from '~/converter/converter.service';
import { ConverterRequestDTO, ConverterResultDTO } from '~/converter/dtos';

@ApiTags('v1')
@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService, private readonly logger: AppLogger) {
    this.logger.setContext(ConverterController.name);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({ description: 'Request accepted display results', type: ConverterResultDTO })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async converter(@Query() request: ConverterRequestDTO) {
    return this.converterService.converter(request).catch(error => {
      const isBcbApiUnexpectedError = error instanceof BcbApiUnexpectedError;
      if (isBcbApiUnexpectedError) {
        this.logger.print({
          error: error.message,
          stack: error.stack
        });
      }
      throw new BadRequestException();
    });
  }
}
