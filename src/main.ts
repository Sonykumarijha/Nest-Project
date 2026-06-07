import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  const port = configService.get<number>('PORT') || 3001
  await app.listen(port)
  Logger.log(`server is running on port: ${port}`)
}
bootstrap();
