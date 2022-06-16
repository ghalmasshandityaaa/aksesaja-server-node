import * as dotenv from 'dotenv';
dotenv.config();

export class Config {
  static get(key: string): string {
    return process.env[key]!;
  }

  static getNumber(key: string): number {
    return Number(process.env[key])!;
  }

  static getBoolean(key: string): boolean {
    return process.env[key] === 'true';
  }

  static getMultiLine(key: string) {
    try {
      const getLine = process.env[key]!;
      return getLine ? getLine.replace(/\\n/g, '\n') : null;
    } catch (e) {
      return null;
    }
  }
}
