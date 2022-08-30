import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('organizer_categories')
export class OrganizerCategories extends BaseEntity {
  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'category_name' })
  categoryName: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'created_by' })
  createdBy: string;
}