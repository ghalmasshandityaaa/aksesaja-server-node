import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../interfaces/auth.interface';
import moment from 'moment';
import {
  OrganizerOptions,
  RegisterOrganizer,
  UpdateOrganizer,
  UpdatePassword,
} from '../interfaces/organizer.interface';
import { Organizer } from '../models/organizer';
import { Connection } from '../config/db.config';
import { DEFAULT_IMAGE_PATH } from '../constants/image.constant';
import { StatsOrganizer } from '../models/stats-organizer';

export class OrganizerService {
  constructor() { }

  static async createOrganizer(params: RegisterOrganizer, auth: Auth) {
    const queryRunner = Connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const currentDate: string = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      /** Organizer data */
      const organizerId: string = uuidv4();
      const organizer = {
        organizerId,
        userId: auth.userId,
        slug: params.organizerName.toLowerCase().replace(/ /g, '-') + '-' + moment().format('YYYYMMDDHHmmss'),
        ...params,
        member: 'DEFAULT',
        status: 'PENDING',
        createdAt: currentDate,
        createdBy: auth.email,
      };

      /** Insert data organizer into database  */
      await queryRunner.manager.createQueryBuilder().insert().into(Organizer).values(organizer).execute();

      /** Insert data stats organizer into database */
      await queryRunner.manager.createQueryBuilder().insert().into(StatsOrganizer).values({
        statsOrganizerId: uuidv4(),
        organizerId,
        createdAt: currentDate,
        createdBy: auth.email,
      }).execute();

      await queryRunner.commitTransaction();
      return { result: 'Organizer registered successfully.', code: 201 };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.error({ service: 'OrganizerService.createOrganizer', message: e.message, stack: e.stack });
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  static async listOrganizer(auth: Auth) {
    try {
      /** Get data organizer from database  */
      const organizers = await Organizer.find({
        where: { userId: auth.userId },
        select: ['organizerId', 'organizerName', 'slug', 'banner', 'photo', 'isLocked'],
      });

      if (organizers.length) {
        for (const organizer of organizers) {
          if (!organizer.photo) organizer.photo = DEFAULT_IMAGE_PATH.PROFILE;
          if (!organizer.banner) organizer.banner = DEFAULT_IMAGE_PATH.BANNER;
        }
      }

      return { result: organizers, code: 200 };
    } catch (e) {
      console.error({ service: 'OrganizerService.listOrganizer', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async updateOrganizer(params: UpdateOrganizer, auth: Auth) {
    try {
      /** Get data organizer from database  */
      const organizers = await Organizer.findOne({
        where: { organizerId: params.organizerId, userId: auth.userId },
        select: ['organizerId', 'organizerName'],
      });

      /** Throw error when organizer not found */
      if (!organizers) throw new Error('Organizer not found.');

      const dataset: any = {
        ...params,
        slug: params.organizerName.toLowerCase().replace(/ /g, '-') + '-' + moment().format('YYYYMMDDHHmmss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedBy: auth.email,
      };

      await this.updateOrganizerById(dataset);

      return { result: 'Successfully updated organizer.', code: 200 };
    } catch (e) {
      console.error({ service: 'OrganizerService.updateOrganizer', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async updateOrganizerById(organizer: OrganizerOptions): Promise<void> {
    try {
      const organizerId = organizer.organizerId;
      delete organizer.organizerId;

      await Connection.createQueryBuilder()
        .update(Organizer)
        .set({ ...organizer })
        .where('organizerId = :organizerId', { organizerId })
        .execute();
    } catch (e) {
      console.error({ service: 'OrganizerService.updateOrganizerById', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async deleteOrganizer(organizerId: string, auth: Auth) {
    try {
      /** Get data organizer from database  */
      const organizers = await Organizer.findOne({
        where: { organizerId, userId: auth.userId },
        select: ['organizerId'],
      });

      /** Throw error when organizer not found */
      if (!organizers) throw new Error('Organizer not found.');

      /** Delete organizer from database  */
      await this.deleteOrganizerByField('organizerId', organizerId);

      return { result: 'Successfully delete organizer', code: 200 };
    } catch (e) {
      console.error({ service: 'OrganizerService.deleteOrganizer', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async deleteOrganizerByField(field: string, value: string | string[]): Promise<void> {
    try {
      if (typeof value === 'string') value = [value];
      /** Get data organizer from database  */

      await Connection.createQueryBuilder()
        .delete()
        .from(Organizer)
        .where(`${field} IN (:...organizerId)`, { organizerId: value })
        .execute();
    } catch (e) {
      console.error({ service: 'OrganizerService.deleteOrganizerById', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async updatePassword(params: UpdatePassword) {
    try {
      /** Get data organizer from database  */
      const organizers = await Organizer.findOne({
        where: { organizerId: params.organizerId },
        select: ['organizerId'],
      });

      /** Throw error when organizer not found */
      if (!organizers) throw new Error('Organizer not found.');

      /** Update password organizer  */
      await this.updateOrganizerById(params);

      return { result: 'Successfully update password', code: 200 };
    } catch (e) {
      console.error({ service: 'OrganizerService.updatePassword', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async detailOrganizer(organizerId: string) {
    try {
      /** Get data organizer from database  */
      const organizers = await Organizer.createQueryBuilder('organizer')
        .leftJoinAndMapOne(
          'organizer.statsOrganizer',
          StatsOrganizer,
          'statsOrganizer',
          'statsOrganizer.organizerId = organizer.organizerId'
        )
        .where('organizer.organizerId = :organizerId', { organizerId })
        .select([
          'organizer.organizerId',
          'organizer.userId',
          'organizer.organizerName',
          'organizer.slug',
          'organizer.description',
          'organizer.address',
          'organizer.email',
          'organizer.phone',
          'organizer.whatsapp',
          'organizer.instagram',
          'organizer.member',
          'organizer.status',
          'organizer.photo',
          'organizer.banner',
          'organizer.createdAt',
          'organizer.createdBy',
          'statsOrganizer.totalEvent',
          'statsOrganizer.upcomingEvent',
          'statsOrganizer.ongoingEvent',
          'statsOrganizer.finishEvent',
          'statsOrganizer.rating',
          'statsOrganizer.testimonial',
        ])
        .getOne();

      /** Throw error when organizer not found */
      if (!organizers) throw new Error('Organizer not found.');

      const statsOrganizer = organizers.statsOrganizer;
      delete organizers.statsOrganizer;

      const result = {
        ...organizers,
        ...statsOrganizer,
      }

      return { result, code: 200 };
    } catch (e) {
      console.error({ service: 'OrganizerService.detailOrganizer', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async detailInformationOrganizer(organizerId: string) {
    try {
      const getDetailOrganizer = await Organizer.findOne({ where: { organizerId }, select: ['detail'] });
      if (!getDetailOrganizer) throw Error('Organizer not found.');

      return getDetailOrganizer.detail;
    } catch (e) {
      console.error({ service: 'OrganizerService.detailOrganizer', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
