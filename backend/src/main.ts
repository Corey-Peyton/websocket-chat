import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  config({ path: '.env' });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useStaticAssets(join(__dirname, '..', '..', 'client'));
  await app.listen(3000);
}
bootstrap();
