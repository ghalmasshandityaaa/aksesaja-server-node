import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusAccountBank {
  INVALID = 'INVALID_ACCOUNT_NUMBER',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'account_bank_id' })
  accountBankId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'bank_code' })
  bankCode: string;

  @Column({ name: 'bank_account_number' })
  bankAccountNumber: string;

  @Column({ name: 'bank_account_name' })
  bankAccountName: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: StatusAccountBank,
    default: StatusAccountBank.PENDING,
  })
  status: StatusAccountBank;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
