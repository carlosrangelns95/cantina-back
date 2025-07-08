import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/core/base.entity';

@Entity('message_templates')
export class MessageTemplate extends BaseEntity {
  @Column({ nullable: false })
  identifier: string;

  @Column({ nullable: false })
  content: string;
}
