import {
  EmailCreateDto,
  EmailFindManyDto,
  EmailReadDto,
  EmailUpdateDto,
} from '@aenode/contact-db/nest';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@aenode/nest/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@aenode/nest/swagger';
import { ValidationErrorResponseDto } from '@aenode/prop';
import { EmailService } from '../../data/index.js';

@ApiBearerAuth()
@Controller('email')
export class EmailController {
  constructor(protected service: EmailService) {}

  @ApiOperation({ summary: 'Find all email' })
  @ApiOkResponse({
    type: EmailReadDto,
    isArray: true,
    description: 'Success: List of emails',
  })
  @ApiUnprocessableEntityResponse({
    type: ValidationErrorResponseDto,
    description: 'Failure: List of validation errors',
  })
  @Get()
  async findMany(@Query() query: EmailFindManyDto) {
    return await this.service.findMany(query);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findUniqueOneById(id);
  }

  @Post()
  async createOne(@Body() data: EmailCreateDto) {
    return await this.service.createOne(data);
  }

  @Patch(':id')
  async updateOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EmailUpdateDto,
  ) {
    return await this.service.updateOneById(id, data);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOneById(id);
  }
}
