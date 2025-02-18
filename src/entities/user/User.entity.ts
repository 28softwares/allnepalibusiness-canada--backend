import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { hashPassword } from "../../utils/crypto.util";
import { Business } from "../business/Business.entity";
import { Token } from "../token/token.entity";

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => Business, (business) => business.owner)
  business: Business;

  @OneToMany(() => Token, (token) => token.user)
  token: Token[];

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }
}
