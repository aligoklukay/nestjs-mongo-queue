import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './services/config-service/config.service';
import { applyGlobalPipes } from './main.global-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  applyGlobalPipes(app)
  await app.listen(config.app.port);
}
bootstrap();
