import { Entity, Column, BaseEntity, OneToOne, PrimaryColumn } from 'typeorm';
import { UserPersonal } from './user-personal';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', nullable: true, name: 'phone' })
  phone: string | null;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ type: 'varchar', name: 'updated_at', nullable: true })
  updatedAt: string | null;

  @Column({ type: 'varchar', name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @OneToOne(() => UserPersonal, (userPersonal) => userPersonal.userId, { nullable: true })
  userPersonal!: UserPersonal;
}
