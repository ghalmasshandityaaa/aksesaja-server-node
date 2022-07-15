import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('feedback')
export class Feedback extends BaseEntity {
  @PrimaryColumn({ name: 'feedback_id' })
  feedbackId: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'subject' })
  subject: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'feedback_type' })
  feedbackType: number;

  @Column({ name: 'is_replied' })
  isReplied: boolean;

  @Column({ name: 'created_at' })
  createdAt: string;
}
