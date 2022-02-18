import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interface/response.interface';
import { User } from 'src/interface/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'utils/encription';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger('auth.service');
@Injectable()
export class AuthService {
  private response: IResponse;
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  /**
   * @description 用户登录方法
   * @date 17/02/2022
   * @param {User} user
   * @return {*}
   * @memberof AuthService
   */
  public async login(user: User) {
    return await this.validateUser(user)
      .then(async (res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          throw this.response;
        }
        const userid = res.msg.userid;
        this.response = {
          code: 0,
          msg: { token: await this.createToken(user), userid },
        };
        return this.response;
      })
      .catch((err) => err);
  }

  /**
   * @description 注册方法
   * @date 14/02/2022
   * @public
   * @param {User} user
   * @return {*}
   * @memberof UserService
   */
  public async regist(user: User) {
    return this.userService
      .findOneByPhone(user.phone)
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 1,
            msg: '当前手机号已注册',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = {
            code: 0,
            msg: '用户注册成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户注册失败，请联系相关负责人' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.log(`${user.phone}:${err.msg}`);
        return this.response;
      });
  }
  /**
   * @description 用户修改方法
   * @date 18/02/2022
   * @param {User} user
   * @return {*}
   * @memberof AuthService
   */
  public async alter(user: User) {
    return this.userService.findOneByPhone(user.phone).then(async () => {
      return await this.userModel
        .findOneAndUpdate({ phone: user.phone }, user, {}, () => {
          logger.log(`用户${user.phone}修改密码成功`);
        })
        .then(() => {
          this.response = {
            code: 0,
            msg: '用户修改成功',
          };
        });
    });
  }

  /**
   * @description 用户登录验证
   * @date 17/02/2022
   * @private
   * @param {User} user
   * @memberof AuthService
   */
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return await this.userService
      .findOneByPhone(phone)
      .then((res) => {
        if (res.length === 0) {
          this.response = { code: 3, msg: '用户尚未注册' };
          throw this.response;
        }
        return res[0];
      })
      .then((dbUser: User) => {
        const pass = encript(password, dbUser.salt);
        if (pass === dbUser.password) {
          return (this.response = { code: 0, msg: { userid: dbUser._id } });
        } else {
          this.response = { code: 4, msg: '用户密码错误' };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * @description 创建token
   * @date 17/02/2022
   * @private
   * @param {User} user
   * @return {*}
   * @memberof AuthService
   */
  private async createToken(user: User) {
    return await this.jwtService.sign(user);
  }
}
