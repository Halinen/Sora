import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户进行注册',
  })
  async registUser(@Body() userDto: User) {
    return await this.userService.regist(userDto);
  }
}
