import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` });

const configService = new ConfigService();

export const JwtContant = {
  secret: configService.get('JWT_SECRET'),
};
