import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { Business } from "../business/Business.entity";
import { Token } from "../token/token.entity";
import BcryptService from "../../utils/bcrypt.util";
import { OTP } from "../otp/otp.entity";

@Entity()
export class User extends CommonEntity {
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;


  @Column({
    default: false
  })
  isVerified: boolean;


  @OneToOne(() => Business, (business) => business.owner)
  business: Business;

  @OneToOne(() => OTP, (otp) => otp.user)
  otp: OTP

  @OneToMany(() => Token, (token) => token.user)
  token: Token[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await BcryptService.hash(this.password);
  }
}
