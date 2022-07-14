import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_verification_code')
export class UserVerificationCode extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_verification_code_id' })
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

  @Column({ nullable: true, name: 'updated_at' })
  updatedAt: string;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy: string;
}
