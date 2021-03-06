import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashPasswordMiddleware } from 'src/middlewares/hash-password.middleware';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
