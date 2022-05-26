import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryColumn({ name: 'user_id', primary: true })
  userId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
