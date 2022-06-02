import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from '../models/users';
dotenv.config();

export const Connection = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  synchronize: false,
  logging: false,
  entities: [Users],
  migrations: ['../migration/**/*.ts'],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
});
