import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppLogger } from '~/app.logger';
import { BcbApiException } from '~/bcb/exceptions';
import { ConverterService } from '~/converter/converter.service';
import { ConverterRequestDTO, ConverterResultDTO } from '~/converter/dtos';

@ApiTags('v1')
@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService, private readonly logger: AppLogger) {
    this.logger.setContext(ConverterController.name);
  }

  @Get()
  @ApiOkResponse({ description: 'Request accepted display results', type: ConverterResultDTO })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async converter(@Query() request: ConverterRequestDTO) {
    return this.converterService.converter(request).catch(error => {
      const isBcbApiException = error instanceof BcbApiException;
      if (isBcbApiException) {
        this.logger.print({ category: error.message, error: error.stack });
      }
      throw new BadRequestException();
    });
  }
}
