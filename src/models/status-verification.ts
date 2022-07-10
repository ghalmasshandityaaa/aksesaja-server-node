import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('status_verification')
export class StatusVerification extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'status_verification_id' })
  statusVerificationId: string;

  @Column({ name: 'status_name' })
  statusName: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;
}
