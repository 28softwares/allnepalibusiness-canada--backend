import { BeforeInsert, Column, Entity, OneToMany, OneToOne, Unique } from "typeorm";
import { CommonEntity } from "../common/CommonSchema.entity";
import { hashPassword } from "../../utils/crypto.util";
import { Business } from "../business/Business.entity";
import { Token } from "../token/token.entity";
import BcryptService from "../../utils/bcrypt.util";
import { MediaType, VerificationDocumentType } from "../../constants/appConstants";
import { Media } from "../media/Media.entity";

@Entity()
export class User extends CommonEntity {
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;


  @OneToOne(() => Business, (business) => business.ownerId)
  business: Business;

  @OneToMany(() => Token, (token) => token.user)
  token: Token[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await BcryptService.hash(this.password);
  }
}
