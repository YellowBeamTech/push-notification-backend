import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  charge_id: string;

  @Column()
  card_id: string;

  @Column()
  fingerprint: string;

  @Column()
  customer_id: string;

  @Column()
  stripe_token: string;

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

  @OneToOne(() => User, (user) => user.payment)
  user: User;
}
