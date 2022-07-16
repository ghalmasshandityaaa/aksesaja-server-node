import { UploadBanner } from '../interfaces/banner.interface';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../interfaces/auth.interface';
import moment from 'moment';
import { Connection } from '../config/db.config';
import { MasterBanner } from '../models/master-banner';

export class BannerService {
  constructor() { }

  static async uploadBanner(params: UploadBanner, auth: Auth) {
    const currentDate: string = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      let status: string = 'INACTIVE';

      if (params.startDate > currentDate) status = 'WILL_COME';
      else if (params.startDate <= currentDate && params.endDate >= currentDate) status = 'ACTIVE';
      else if (params.endDate < currentDate) status = 'EXPIRED';

      /** Insert data banner into database */
      const insertData: object = {
        bannerId: uuidv4(),
        bannerName: params.bannerName,
        position: params.position,
        fileAddress: params.fileAddress,
        urlLink: params.urlLink,
        startDate: params.startDate,
        endDate: params.endDate,
        status,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdBy: auth.email,
      };

      await Connection.createQueryBuilder().insert().into(MasterBanner).values(insertData).execute();

      return { result: 'Successfully upload banner.', code: 200 };
    } catch (e) {
      console.error({ service: 'FeedbackService.uploadBanner', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async getAllBanner() {
    try {
      /** Get All Banner */
      const getAllBanner: MasterBanner[] = await MasterBanner.createQueryBuilder('masterBanner').getMany();

      for (const data of getAllBanner) {
        data.createdAt = moment.utc(data.createdAt).format('YYYY-MM-DD HH:mm:ss');
        data.startDate = moment.utc(data.startDate).format('YYYY-MM-DD HH:mm:ss');
        data.endDate = moment.utc(data.endDate).format('YYYY-MM-DD HH:mm:ss');
        if (data.updatedBy) moment.utc(data.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      }

      return { result: getAllBanner, code: 200 };
    } catch (e) {
      console.error({ service: 'FeedbackService.getAllBanner', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async getHomepageBanner() {
    try {
      /** Get All Banner */
      const getHomepageBanner: MasterBanner[] = await MasterBanner.createQueryBuilder('masterBanner')
        .where('masterBanner.position = :position', { position: 'HOMEPAGE' })
        .getMany();

      for (const data of getHomepageBanner) {
        data.createdAt = moment.utc(data.createdAt).format('YYYY-MM-DD HH:mm:ss');
        data.startDate = moment.utc(data.startDate).format('YYYY-MM-DD HH:mm:ss');
        data.endDate = moment.utc(data.endDate).format('YYYY-MM-DD HH:mm:ss');
        if (data.updatedBy) moment.utc(data.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      }

      return { result: getHomepageBanner, code: 200 };
    } catch (e) {
      console.error({ service: 'FeedbackService.getHomepageBanner', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
