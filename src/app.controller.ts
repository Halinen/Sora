import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App 总模块')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@ApiOperation()表示一个http请求的操作
  @ApiOperation({
    summary: '测试接口',
  })
  getHello(): string {
    return this.appService.getGoodbye();
  }
}
