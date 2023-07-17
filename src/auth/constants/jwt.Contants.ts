import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';

ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` });

const configService = new ConfigService();

export const JwtContantsList = registerAs('jwtConstants', () => ({
  secret: configService.get('JWT_SECRET'),
  refreshSecret: configService.get('JWT_REFRESH_SECRET'),
}));
