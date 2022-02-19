import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConverterService } from '~/converter/converter.service';
import { ConverterRequestDTO, ConverterResultDTO } from '~/converter/dtos';

@ApiTags('v1')
@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get()
  @ApiOkResponse({ description: 'Request accepted display results', type: ConverterResultDTO })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async converter(@Query() request: ConverterRequestDTO) {
    return this.converterService.converter(request);
  }
}
