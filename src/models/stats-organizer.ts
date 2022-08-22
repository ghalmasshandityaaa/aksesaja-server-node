import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('stats_organizer')
export class StatsOrganizer extends BaseEntity {
  @PrimaryColumn({ name: 'stats_organizer_id' })
  statsOrganizerId: string;

  @Column({ name: 'organizer_id' })
  organizerId: string;

  @Column({ name: 'total_event' })
  totalEvent: number;

  @Column({ name: 'upcoming_event' })
  upcomingEvent: number;

  @Column({ name: 'ongoing_event' })
  ongoingEvent: number;

  @Column({ name: 'finish_event' })
  finishEvent: number;

  @Column({ name: 'rating' })
  rating: number;

  @Column({ name: 'testimonial' })
  testimonial: number;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
