import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { StatusVerification } from './status-verification';

@Entity('user_personal')
export class UserPersonal extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_personal_id' })
  userPersonalId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'photo' })
  photo: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'birthdate' })
  birthdate: Date;

  @Column({ name: 'birthplace' })
  birthplace: string;

  @Column({ name: 'institution' })
  institution: string;

  @Column({ name: 'status_verification_id' })
  statusVerificationId: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @OneToOne(() => StatusVerification, (statusVerification) => statusVerification.statusVerificationId)
  statusVerification!: StatusVerification;
}
