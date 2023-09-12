import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SocketAdapter } from './SocketAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.use(cookieParser());
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
