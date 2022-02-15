import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { AppModule } from './app.module';

const listenport = 3000;
const logger = new Logger();
/**
 * @description 主方法
 * @date 15/02/2022
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  /**
   * 配置 Swagger
   */
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /**
   * 使用 log4js 日志框架
   */
  app.useLogger(app.get(Log4jsLogger));
  await app.listen(3000);
};
bootstrap().then(() => {
  logger.log(`listen in localhost:${listenport}`);
});
