import { Config } from './config.helper';
import * as CryptoJS from 'crypto-js';

export function textEncrypt(text: string) {
  const secretKey = Config.get('KEY')!;
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function textDecrypt(encryptedtext: string) {
  const secretKey = Config.get('KEY')!;
  const bytes = CryptoJS.AES.decrypt(encryptedtext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function randomBetweenNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomNumber(totalLength: number) {
  let token = '';

  for (let i = 0; i < totalLength; i++) {
    token = token + Math.floor(Math.random() * (9 - 1 + 1) + 1);
  }

  return token;
}
