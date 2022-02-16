import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
/**
 * @description 做权限分配，首先添加构造函数，用到Reflector属性，然后调用它的get方法
 * @date 16/02/2022
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /**
     * 获取元数据中注入进去的用户权限。没有权限要求时，放行，
     */
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    // switch (context.switchToHttp().getRequest()) {
    //   case 'user':
    //     roles
    //     break;
    //   default:
    //     break;
    // }
    return true;
  }
}
