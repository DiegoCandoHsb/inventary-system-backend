import { BadRequestException, Logger } from '@nestjs/common';

export class HandleException {
  private readonly logger = new Logger();

  logException(error: any) {
    console.log(error);
    this.logger.log(error.detail);

    throw new BadRequestException({
      error: 400,
      details: error.detail,
      parameters: error.parameters,
      message: 'Bad Request',
    });
  }
}
