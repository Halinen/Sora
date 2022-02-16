import * as crypto from 'crypto';
/**
 * 调用randombytes生成二进制流，转换成base64的字符串
 * @returns
 */
export function addSalt() {
  return crypto.randomBytes(3).toString('base64');
}

export function encript(userPassword: string, salt: string): string {
  return crypto
    .pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256')
    .toString('base64');
}
