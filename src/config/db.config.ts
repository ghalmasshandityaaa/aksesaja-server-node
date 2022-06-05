import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from '../models/users';
import { UserVerificationCode } from '../models/user-verification-code';
dotenv.config();

export const Connection = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  username: 'eiljehfsyyerex',
  password: 'a672bdf1632bab02d6914239a4d0e4dcd37c8f5b2d87994496b5ed2ad7712676',
  database: 'dduvj2vb89fmvr',
  synchronize: false,
  logging: false,
  entities: [Users, UserVerificationCode],
  migrations: ['../migration/**/*.ts'],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
});
