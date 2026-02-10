import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //instance of App
  const app = await NestFactory.create(AppModule);

  //configuration OpenAPI/Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cat API')
    .setVersion('1.0')
    .setDescription('API to manage and consult cats')
    .build()

  //creation of document JSON/YAML
  const createDocument = () => SwaggerModule.createDocument(app, swaggerConfig);

  //'api' -> endpoint after IP + port
  //app -> what server has to use Swagger
  SwaggerModule.setup('api', app, createDocument);

  //implementation of pipes for validation at a global level
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  //turns on server
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
