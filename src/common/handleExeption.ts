import { BadRequestException, Logger } from '@nestjs/common';

export class HandleException {
  private readonly logger = new Logger();
  logException(error: any) {
    this.logger.error(error);
    throw new BadRequestException({
      error: 400,
      details: error.detail,
      parameters: error.parameters,
      message: 'Bad Request',
    });
  }
}
