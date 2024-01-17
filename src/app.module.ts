import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HsbusersModule } from './hsbusers/hsbusers.module';
import { DatabaseSourceConfig } from './config/dbconfig';
import { AuthModule } from './auth/auth.module';
import { HsbcatalogModule } from './hsbcatalog/hsbcatalog.module';
import { HsbAssetsModule } from './hsbassets/hsb-assets.module';
import { JwtContantsList } from './auth/constants/jwt.Contants';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseSourceConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [JwtContantsList],
    }),
    AuthModule,
    HsbusersModule,
    HsbAssetsModule,
    HsbcatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
