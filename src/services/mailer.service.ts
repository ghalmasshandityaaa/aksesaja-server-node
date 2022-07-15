import nodemailer from 'nodemailer';
import { Config } from '../helpers/config.helper';
import hbs from 'nodemailer-express-handlebars';
import { Connection } from '../config/db.config';
import moment from 'moment';
import { MailOptionsInterface, SetLogEmailInterface } from '~/interfaces/mailer.interface';
import { LogMail } from '../models/log-mail';
import { v4 as uuidv4 } from 'uuid';

export class MailerService {
  constructor() { }

  static async sendEmail(mailOption: MailOptionsInterface) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: Config.get('MAIL_USER'),
          pass: Config.get('MAIL_APP_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const handlebarsOptions = {
        viewEngine: {
          extName: '.hbs',
          partialsDir: 'src/views/email/',
          layoutsDir: 'src/views/email/',
          defaultLayout: '',
        },
        viewPath: 'src/views/email/',
        extName: '.hbs',
      };

      transporter.use('compile', hbs(handlebarsOptions));

      const mailOptions: MailOptionsInterface = {
        from: `Aksesaja Official < ${Config.get('MAIL_USER')} >`,
        to: mailOption.to,
        subject: mailOption.subject,
        template: mailOption.template,
        context: mailOption.context,
        attachments: mailOption.attachments,
      };

      const dataLog: SetLogEmailInterface = {
        description: mailOption.description!,
        sendTo: mailOption.to,
      };

      transporter.sendMail(mailOptions, async (error, response) => {
        if (error) {
          await this.setLogEMail(error, dataLog);
        } else {
          await this.setLogEMail(response, dataLog);
        }
      });
    } catch (e) {
      console.error({ service: 'MailerService.sendEmail', message: e.message, stack: e.stack });
      throw e;
    }
  }

  static async setLogEMail(response: any, data: SetLogEmailInterface) {
    let status = 'FAILED';
    try {
      /** Validation Status send email */
      if (response && response !== undefined && response.response.includes('250 2.0.0 OK')) {
        status = 'SUCCESS';
      }

      const dataset = {
        logMailId: uuidv4(),
        description: data.description,
        recipient: data.sendTo,
        status: status,
        response: response.response,
        responseDetail: JSON.stringify(response),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      /** Insert log */
      await Connection.createQueryBuilder().insert().into(LogMail).values(dataset).execute();

      console.log(response, data);
    } catch (e) {
      console.error({ service: 'AuthService.setLogEMail', message: e.message, stack: e.stack });
      throw e;
    }
  }
}
