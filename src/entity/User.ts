import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { userInterface } from '../interface/User';
import { Package } from './Package';

export enum status {
  ACTIVE = 'active',
  DEACTIVE = 'deactive',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  password: string | null;

  @Column()
  phone_no: string;

  @Column({
    type: 'enum',
    enum: status,
    nullable: false,
    default: status.DEACTIVE
  })
  status: status;

  @Column({default: false})
  is_admin: boolean;

  @Column({nullable: true})
  notification_limit: number;

  @Column({nullable: true})
  social_login: boolean;

  @Column({nullable: true})
  social_token: boolean;

  @Column({nullable: true})
  package_id: string;

  @Column({nullable: true})
  device_registration_token: string;  
  
  @Column({nullable: true})
  reset_token: string;

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

  @OneToOne(() => Package, (userPackage) => userPackage.user)
  @JoinColumn({ name: "package_id" })
  usePackage: Package;

  // public static mockTestBoard(): userInterface {
  //   const user: User = new User();
  //   user.firstName = 'Timber';
  //   user.lastName = 'Saw';
  //   user.age = 20;
  //   return user;
  // }
}
