import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users } from '../models/users';
import { UserVerificationCode } from '../models/user-verification-code';
import { LogMail } from '../models/log-mail';
import { UserPersonal } from '../models/user-personal';
import { StatusVerification } from '../models/status-verification';
import { Feedback } from '../models/feedback';
import { MasterBanner } from '../models/master-banner';
import { Organizer } from '../models/organizer';
import { StatsOrganizer } from '../models/stats-organizer';
import { Config } from '../helpers/config.helper';

export const Connection = new DataSource({
  type: 'postgres',
  url: Config.get('DATABASE_URL') || 'postgres://postgres:postgres@localhost:5432/postgres',
  synchronize: false,
  logging: Config.get('APP_MODE') === 'production' ? false : true,
  entities: [Users, UserVerificationCode, LogMail, UserPersonal, StatusVerification, Feedback, MasterBanner, Organizer, StatsOrganizer],
  migrations: ['../migration/**/*.ts'],
  subscribers: [],
  // ssl: { rejectUnauthorized: false },
});
