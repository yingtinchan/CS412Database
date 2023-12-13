import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useStaticAssets(join(__dirname, '../..', 'public'),)
  const config = new DocumentBuilder()
    .setTitle('Schoolweb API Document')
    .setDescription('Schoolweb API description')
    .setVersion('1.0')
    .addTag('Schoolweb')
    .build();

  app.enableCors(
    {
      origin: ['*'],
    }
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
