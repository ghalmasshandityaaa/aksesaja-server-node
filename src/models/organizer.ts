import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';
import { StatsOrganizer } from './stats-organizer';

@Entity('organizer')
export class Organizer extends BaseEntity {
  @PrimaryColumn({ name: 'organizer_id' })
  organizerId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'organizer_name' })
  organizerName: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'detail', nullable: true })
  detail: string;

  @Column({ name: 'member' })
  member: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'photo', nullable: true })
  photo: string;

  @Column({ name: 'banner', nullable: true })
  banner: string;

  @Column({ name: 'is_locked', nullable: true })
  isLocked: boolean;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  statsOrganizer?: StatsOrganizer;
}
