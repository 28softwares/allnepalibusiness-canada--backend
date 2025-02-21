import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { User } from "../user/User.entity";

@Entity()
export class OTP extends CommonEntity {
  @Column({
    default: 0
  })
  otp: number;


  @Column({
    default: new Date(Date.now())
  })
  iat: Date;


  @Column({
    default: new Date(Date.now() + 1000 * 60 * 2)
  })
  exp: Date

  @OneToOne(() => User, (user) => user.otp)
  @JoinColumn()
  userId: string;

}