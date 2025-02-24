import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Gelen requestlerde DTO'da tanımlanmayan property'lerin gelmesini engeller
    transform: true, // Gelen requestlerde DTO'da tanımlanan property'lerin tip dönüşümünü yapar. type safety sağlar.
  }));



   // Create the swagger configuration
   const config = new DocumentBuilder()
   .setTitle('NestJS Masterclass - Blog app API')
   .setDescription('Use the base API URL as http://localhost:3000')
   .setTermsOfService('http://localhost:3000/terms-of-service')
   .addServer('http://localhost:3000/')
   .setVersion('1.0')
   .build();
 // Instantiate Swagger
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api-documantation', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
