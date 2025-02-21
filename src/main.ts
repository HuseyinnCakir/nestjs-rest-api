import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Gelen requestlerde DTO'da tanımlanmayan property'lerin gelmesini engeller
    transform: true, // Gelen requestlerde DTO'da tanımlanan property'lerin tip dönüşümünü yapar. type safety sağlar.
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
