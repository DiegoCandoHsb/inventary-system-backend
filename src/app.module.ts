import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HsbusersModule } from './hsbusers/hsbusers.module';
import { DatabaseSourceConfig } from './config/dbconfig';
import { AuthModule } from './auth/auth.module';
import { HsbAssetsModule } from './hsb-assets/hsb-assets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseSourceConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    HsbusersModule,
    AuthModule,
    HsbAssetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
