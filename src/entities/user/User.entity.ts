import { BeforeInsert, Column, Entity, OneToOne } from "typeorm";
import { CommonSchema } from "../common/CommonSchema.entity";
import { hashPassword } from "../../utils/crypto.util";
import { Business } from "../business/Business.entity";

@Entity()
export class User extends CommonSchema {
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => Business, (business) => business.owner)
  business: Business;

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }
}
