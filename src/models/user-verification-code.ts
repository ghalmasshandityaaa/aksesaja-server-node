import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserVerificationCode')
export class UserVerificationCode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_verification_code_id' })
  userVerificationCodeId: string;

  @Column({ name: 'verification_code' })
  verificationCode: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'retry' })
  retry: number;

  @Column({ name: 'expired_date' })
  expiredDate: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
