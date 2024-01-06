import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Inventory System API')
    .setDescription('Enpoints for all mehtods')
    .setVersion('V1')
    .addTag('─── ⋆⋅☆⋅⋆ Enpoints list ⋆⋅☆⋅⋆ ───')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT'));
  console.log(`APP is running on: ${await app.getUrl()}`);
}
bootstrap();
