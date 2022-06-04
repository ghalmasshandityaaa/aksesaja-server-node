import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from '../models/users';
import { UserVerificationCode } from '../models/user-verification-code';
dotenv.config();

export const Connection = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  synchronize: false,
  logging: false,
  entities: [Users, UserVerificationCode],
  migrations: ['../migration/**/*.ts'],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
});
