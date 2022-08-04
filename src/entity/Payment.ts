import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  transaction_id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  amount: number;

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

}
