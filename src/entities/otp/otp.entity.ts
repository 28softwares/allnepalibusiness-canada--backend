import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { User } from "../user/User.entity";

@Entity()
export class OTP extends CommonEntity {
  @Column()
  otp: number;

  @Column()
  exp: Date;

  @OneToOne(() => User, (user) => user.otp)
  @JoinColumn()
  user: User

  @BeforeInsert()
  setExpiration() {
    this.exp = new Date(Date.now() + 1000 * 60 * 2); //expires in 2 minutes
  }

}