import { Body, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/interface/user.interface';
import { Role } from '../role/role.decorator';
import { UserService } from './user.service';
/**
 * 标明当前路由user
 */
@Controller('user')
@ApiTags('用户模块')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户进行注册',
  })
  async registUser(@Body() userDto: User) {
    return await this.userService.regist(userDto);
  }

  @Get('hello')
  // @SetMetadata('roles', ['admin']) //设置元数据方式
  @Role('admin')
  hello() {
    return 'hello!';
  }
}
