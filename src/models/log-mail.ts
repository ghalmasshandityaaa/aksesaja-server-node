import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log_mail')
export class LogMail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'log_mail_id' })
  logMailId: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'recipient' })
  recipient: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'response' })
  response: string;

  @Column({ name: 'response_detail' })
  responseDetail: string;

  @Column({ name: 'created_at' })
  createdAt: string;
}
