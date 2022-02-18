import { Body, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { Role } from '../role/role.decorator';
import { UserService } from './user.service';
/**
 * 标明当前路由user
 */
@Controller('user')
@ApiTags('用户模块')
// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  // @SetMetadata('roles', ['admin']) //设置元数据方式
  @Role('admin')
  hello() {
    return this.userService.hello();
  }
}
