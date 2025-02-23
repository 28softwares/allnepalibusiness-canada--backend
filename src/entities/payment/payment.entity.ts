// payment -> user , date, time.
import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';
import { CommonEntity } from '../common/CommonSchema.entity';
import { User } from '../user/User.entity';
import { encrypt, decrypt } from '../../utils/crypto.util';

export enum PAYMENT_STATUS {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}
@Entity('payments')
export class Payment extends CommonEntity {
  @Column({
    type: 'text',
  })
  amount: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: 'PENDING',
  })
  status: 'SUCCESS' | 'PENDING' | 'FAILED';

  @Column({ nullable: true })
  transactionId: string;

  @Column()
  currency: string;

  @Column()
  paymentMode: string;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date', nullable: true })
  subscriptionStartDate: Date;

  @Column({ type: 'date', nullable: true })
  subscriptionEndDate: Date;

  @BeforeInsert()
  @BeforeUpdate()
  _() {
    this.amount = encrypt(this.amount.toString());
  }

  @AfterLoad()
  __() {
    this.amount = decrypt(this.amount);
    this.amount = (parseFloat(this.amount) / 100).toString();
    console.log(this.amount);
  }
}
