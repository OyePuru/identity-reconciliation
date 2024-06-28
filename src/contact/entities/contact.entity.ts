import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export enum LinkPrecedence {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  linkedId?: number;

  @Column({ type: "enum", enum: LinkPrecedence })
  linkPrecedence: LinkPrecedence;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
