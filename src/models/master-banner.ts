import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('master_banner')
export class MasterBanner extends BaseEntity {
  @PrimaryColumn({ name: 'banner_id' })
  bannerId: string;

  @Column({ name: 'banner_name' })
  bannerName: string;

  @Column({ name: 'position' })
  position: string;

  @Column({ name: 'file_address' })
  fileAddress: string;

  @Column({ name: 'url_link' })
  urlLink: string;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'updated_by' })
  updatedBy: string;
}
