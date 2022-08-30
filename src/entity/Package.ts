import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';

export enum currency {
  PK = 'pk',
  USD = 'usd',
}
@Entity()
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true, type: 'text'})
  description: string;

  @Column()
  no_of_notifications: number;

  @Column({ type: "timestamptz" })
  expairy_time: Date;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: currency,
    nullable: true,
  })
  currency: currency;  

  @Column({default: false})
  is_deleted: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at: Date;

  @DeleteDateColumn({
      nullable: true,
      type: "timestamptz"
  })
  deleted_at: Date | null;

  @OneToMany(() => User, (user) => user.userPackage)
  @JoinColumn({ referencedColumnName: "package_id" })
  user: User[];

}
