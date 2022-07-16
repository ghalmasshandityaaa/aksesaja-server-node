import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from '../models/users';
import { UserVerificationCode } from '../models/user-verification-code';
import { LogMail } from '../models/log-mail';
import { UserPersonal } from '../models/user-personal';
import { StatusVerification } from '../models/status-verification';
import { Feedback } from '../models/feedback';
import { MasterBanner } from '../models/master-banner';
dotenv.config();

export const Connection = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  synchronize: false,
  logging: false,
  entities: [
    Users,
    UserVerificationCode,
    LogMail,
    UserPersonal,
    StatusVerification,
    Feedback,
    MasterBanner
  ],
  migrations: ['../migration/**/*.ts'],
  subscribers: [],
  // ssl: { rejectUnauthorized: false },
});
